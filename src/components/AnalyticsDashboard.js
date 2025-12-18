import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';

// Analytics service (shared with ShareButton)
class ShareAnalytics {
  constructor() {
    this.shareCounts = JSON.parse(localStorage.getItem('shareAnalytics') || '{}');
  }

  getShareStats(postId = null) {
    if (postId) {
      const postStats = {};
      Object.keys(this.shareCounts).forEach(key => {
        if (key.startsWith(`share_${postId}_`)) {
          const platform = key.split('_').slice(2).join('_');
          postStats[platform] = this.shareCounts[key];
        }
      });
      return postStats;
    } else {
      return this.shareCounts;
    }
  }

  getTotalShares(postId = null) {
    if (postId) {
      const stats = this.getShareStats(postId);
      return Object.values(stats).reduce((total, stat) => total + stat.count, 0);
    } else {
      return Object.values(this.shareCounts).reduce((total, stat) => total + stat.count, 0);
    }
  }

  getPlatformBreakdown() {
    const platformTotals = {};
    Object.entries(this.shareCounts).forEach(([key, data]) => {
      const platform = key.split('_').slice(2).join('_');
      platformTotals[platform] = (platformTotals[platform] || 0) + data.count;
    });
    return Object.entries(platformTotals).map(([platform, count]) => ({ platform, count }));
  }

  getRecentShares(limit = 10) {
    const allEvents = [];
    Object.entries(this.shareCounts).forEach(([key, data]) => {
      const postId = key.split('_')[1];
      const platform = key.split('_').slice(2).join('_');
      data.events.forEach(event => {
        allEvents.push({
          ...event,
          postId,
          platform,
          totalShares: data.count
        });
      });
    });
    return allEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit);
  }

  clearAnalytics() {
    localStorage.removeItem('shareAnalytics');
    this.shareCounts = {};
  }
}

const COLORS = ['#1877F2', '#1DA1F2', '#0077B5', '#25D366', '#FF4500', '#BD081C', '#0088CC', '#EA4335'];

export default function AnalyticsDashboard({ onBack }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [analytics] = useState(new ShareAnalytics());
  const [platformData, setPlatformData] = useState([]);
  const [recentShares, setRecentShares] = useState([]);
  const [totalShares, setTotalShares] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on client side before accessing browser APIs
    setIsClient(true);
    
    // Add a small delay to ensure DOM elements are ready
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          setPlatformData(analytics.getPlatformBreakdown());
          setRecentShares(analytics.getRecentShares());
          setTotalShares(analytics.getTotalShares());
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
        // Set fallback data
        setPlatformData([]);
        setRecentShares([]);
        setTotalShares(0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [analytics]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClearAnalytics = () => {
    if (window.confirm('Are you sure you want to clear all analytics data?')) {
      analytics.clearAnalytics();
      setPlatformData([]);
      setRecentShares([]);
      setTotalShares(0);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getPlatformName = (platform) => {
    const platformNames = {
      facebook: t('share.facebook'),
      twitter: t('share.twitter'),
      linkedin: t('share.linkedin'),
      whatsapp: t('share.whatsapp'),
      reddit: t('share.reddit'),
      pinterest: t('share.pinterest'),
      telegram: t('share.telegram'),
      email: t('share.email')
    };
    return platformNames[platform] || platform;
  };

  // Don't render charts on server side or if not ready
  if (!isClient) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {onBack && (
            <IconButton onClick={onBack} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h4" fontWeight="bold">
            📊 {t('analytics.title', 'Social Sharing Analytics')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <Typography color="text.secondary">Loading analytics...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box ref={containerRef} sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {onBack && (
          <IconButton onClick={onBack} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h4" fontWeight="bold">
          📊 {t('analytics.title', 'Social Sharing Analytics')}
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('analytics.totalShares', 'Total Shares')}
              </Typography>
              <Typography variant="h3" color="primary">
                {totalShares}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('analytics.platforms', 'Platforms')}
              </Typography>
              <Typography variant="h3" color="secondary">
                {platformData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('analytics.mostPopular', 'Most Popular')}
              </Typography>
              <Typography variant="h6" color="success.main">
                {platformData.length > 0 ? getPlatformName(platformData[0].platform) : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleClearAnalytics}
                fullWidth
              >
                {t('analytics.clear', 'Clear Data')}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={t('analytics.charts', 'Charts')} />
          <Tab label={t('analytics.recent', 'Recent Activity')} />
          <Tab label={t('analytics.details', 'Details')} />
        </Tabs>
      </Box>

      {/* Charts Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📈 {t('analytics.byPlatform', 'Shares by Platform')}
                </Typography>
                {platformData.length > 0 && typeof window !== 'undefined' ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={platformData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="platform" 
                        tickFormatter={getPlatformName}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(platform) => getPlatformName(platform)}
                        formatter={(value) => [`${value} shares`, 'Count']}
                      />
                      <Legend formatter={getPlatformName} />
                      <Bar dataKey="count" fill="#1976d2" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
                    <Typography>
                      {t('analytics.noData', 'No data available yet. Start sharing posts to see analytics!')}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🥧 {t('analytics.distribution', 'Platform Distribution')}
                </Typography>
                {platformData.length > 0 && typeof window !== 'undefined' ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ platform, percent }) => `${getPlatformName(platform)} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} shares`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
                    <Typography>
                      {t('analytics.noData', 'No data available yet. Start sharing posts to see analytics!')}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Recent Activity Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ⏰ {t('analytics.recentShares', 'Recent Shares')}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('analytics.timestamp', 'Time')}</TableCell>
                    <TableCell>{t('analytics.platform', 'Platform')}</TableCell>
                    <TableCell>{t('analytics.post', 'Post')}</TableCell>
                    <TableCell>{t('analytics.shares', 'Total Shares')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentShares.map((share, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(share.timestamp)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={getPlatformName(share.platform)} 
                          size="small" 
                          color="primary" 
                        />
                      </TableCell>
                      <TableCell>{share.postTitle}</TableCell>
                      <TableCell>{share.totalShares}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {recentShares.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                <Typography>
                  {t('analytics.noData', 'No sharing activity yet. Start sharing posts to see analytics!')}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Details Tab */}
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 {t('analytics.allStats', 'All Statistics')}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('analytics.platform', 'Platform')}</TableCell>
                    <TableCell>{t('analytics.totalShares', 'Total Shares')}</TableCell>
                    <TableCell>{t('analytics.firstShare', 'First Share')}</TableCell>
                    <TableCell>{t('analytics.lastShare', 'Last Share')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {platformData.map(({ platform, count }) => {
                    const platformKey = Object.keys(analytics.getShareStats())
                      .find(key => key.includes(platform));
                    const stats = platformKey ? analytics.shareCounts[platformKey] : null;
                    
                    return (
                      <TableRow key={platform}>
                        <TableCell>
                          <Chip 
                            label={getPlatformName(platform)} 
                            size="small" 
                            color="primary" 
                          />
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">{count}</Typography>
                        </TableCell>
                        <TableCell>
                          {stats ? formatDate(stats.firstShare) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {stats ? formatDate(stats.lastShare) : 'N/A'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}