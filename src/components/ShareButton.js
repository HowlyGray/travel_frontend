import React, { useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  PinterestShareButton,
  TelegramShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  PinterestIcon,
  TelegramIcon
} from 'react-share';
import {
  Box,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  Button
} from '@mui/material';
import { Share, ContentCopy, Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';



// Analytics service for tracking share events
class ShareAnalytics {
  constructor() {
    this.shareCounts = JSON.parse(localStorage.getItem('shareAnalytics') || '{}');
  }

  logShareEvent(platform, postId, postTitle, postCategory) {
    const timestamp = new Date().toISOString();
    const event = {
      platform,
      postId,
      postTitle,
      postCategory,
      timestamp,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    // Store in localStorage for analytics
    const key = `share_${postId}_${platform}`;
    if (!this.shareCounts[key]) {
      this.shareCounts[key] = {
        count: 0,
        firstShare: timestamp,
        lastShare: timestamp,
        events: []
      };
    }
    
    this.shareCounts[key].count += 1;
    this.shareCounts[key].lastShare = timestamp;
    this.shareCounts[key].events.push(event);
    
    // Keep only last 10 events per post/platform to avoid storage bloat
    if (this.shareCounts[key].events.length > 10) {
      this.shareCounts[key].events = this.shareCounts[key].events.slice(-10);
    }

    localStorage.setItem('shareAnalytics', JSON.stringify(this.shareCounts));

    // Console logging for debugging
    console.log(`[Analytics] Share tracked: ${postTitle} shared on ${platform}`);
    console.log(`Total ${platform} shares for post ${postId}: ${this.shareCounts[key].count}`);

    // Google Analytics integration (commented out - uncomment if GA is implemented)
    // if (typeof window.gtag !== 'undefined') {
    //   window.gtag('event', 'share', {
    //     platform: platform,
    //     post_id: postId,
    //     post_title: postTitle,
    //     post_category: postCategory
    //   });
    // }

    return this.shareCounts[key].count;
  }

  getShareStats(postId = null) {
    if (postId) {
      // Get stats for specific post
      const postStats = {};
      Object.keys(this.shareCounts).forEach(key => {
        if (key.startsWith(`share_${postId}_`)) {
          const platform = key.split('_').slice(2).join('_');
          postStats[platform] = this.shareCounts[key];
        }
      });
      return postStats;
    } else {
      // Get global stats
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

  clearAnalytics() {
    localStorage.removeItem('shareAnalytics');
    this.shareCounts = {};
  }
}

// Global analytics instance
const shareAnalytics = new ShareAnalytics();

export default function ShareButton({ post }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/post/${post.id}`;
  const open = Boolean(anchorEl);

  // Get localized social messages
  const getSocialMessage = (platform) => {
    const template = t(`share.messages.${platform}`, {
      title: post.title,
      location: post.location,
      category: post.category.replace(/\s+/g, ''),
      description: post.description.substring(0, 100) + (post.description.length > 100 ? '...' : '')
    });
    return template;
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = (platform) => {
    const shareCount = shareAnalytics.logShareEvent(platform, post.id, post.title, post.category);
    console.log(`Post shared ${shareCount} time(s) on ${platform}`);
  };

  return (
    <>
      <Tooltip title={t('share.title')}>
        <IconButton onClick={handleShareClick} size="small">
          <Share fontSize="small" />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: { p: 2, minWidth: 300 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            {t('share.title')}
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <FacebookShareButton
            url={shareUrl}
            quote={getSocialMessage('facebook')}
            beforeOnClick={() => handleShare('facebook')}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={getSocialMessage('twitter')}
            beforeOnClick={() => handleShare('twitter')}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton
            url={shareUrl}
            title={post.title}
            summary={post.description.substring(0, 100)}
            beforeOnClick={() => handleShare('linkedin')}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={getSocialMessage('whatsapp')}
            beforeOnClick={() => handleShare('whatsapp')}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <RedditShareButton
            url={shareUrl}
            title={getSocialMessage('reddit')}
            beforeOnClick={() => handleShare('reddit')}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <PinterestShareButton
            url={shareUrl}
            description={getSocialMessage('pinterest')}
            media={post.images && post.images.length > 0 ? post.images[0].url : undefined}
            beforeOnClick={() => handleShare('pinterest')}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <TelegramShareButton
            url={shareUrl}
            title={getSocialMessage('telegram')}
            beforeOnClick={() => handleShare('telegram')}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={t('share.messages.emailSubject', { title: post.title })}
            body={`${post.title}\n\n${post.description}\n\n${t('share.messages.email')}: ${shareUrl}`}
            beforeOnClick={() => handleShare('email')}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopy />}
            onClick={handleCopyLink}
            fullWidth
          >
            {copied ? t('share.linkCopied') : t('share.copyLink')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}