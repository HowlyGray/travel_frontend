import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Explore as ExploreIcon, Photo as PhotoIcon, People as PeopleIcon } from '@mui/icons-material';
import { designTokens } from '../theme/designTokens';

/**
 * HeroSection - Section d'accueil moderne et attrayante
 * Présente la mission de la plateforme de partage de lieux
 */
const HeroSection = ({ onGetStarted }) => {
  return (
    <Box
      sx={{
        background: designTokens.colors.gradientPrimary,
        color: designTokens.colors.white,
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {/* Main Heading */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: designTokens.typography.fontWeight.extrabold,
              fontFamily: designTokens.typography.fontFamily.display,
              lineHeight: designTokens.typography.lineHeight.tight,
              mb: 3,
              letterSpacing: designTokens.typography.letterSpacing.tighter,
            }}
          >
            Découvrez et Partagez
            <br />
            des Lieux Incroyables
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: designTokens.typography.fontWeight.normal,
              mb: 5,
              opacity: 0.95,
              lineHeight: designTokens.typography.lineHeight.relaxed,
            }}
          >
            Une plateforme sociale pour explorer, partager et soutenir les petits commerces
            et les lieux cachés qui font la richesse de nos régions.
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{
              backgroundColor: designTokens.colors.white,
              color: designTokens.colors.primary,
              fontSize: designTokens.typography.fontSize.lg,
              fontWeight: designTokens.typography.fontWeight.semibold,
              px: 6,
              py: 2,
              borderRadius: designTokens.borderRadius.full,
              textTransform: 'none',
              boxShadow: designTokens.shadows.lg,
              '&:hover': {
                backgroundColor: designTokens.colors.gray50,
                transform: 'translateY(-2px)',
                boxShadow: designTokens.shadows.xl,
              },
              transition: designTokens.transitions.base,
            }}
          >
            Commencer l'aventure
          </Button>

          {/* Feature Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              mt: 10,
            }}
          >
            {[
              {
                icon: <ExploreIcon sx={{ fontSize: 40 }} />,
                title: 'Explorez',
                description: 'Découvrez des lieux uniques partagés par la communauté',
              },
              {
                icon: <PhotoIcon sx={{ fontSize: 40 }} />,
                title: 'Partagez',
                description: 'Immortalisez vos découvertes en photos et inspirez les autres',
              },
              {
                icon: <PeopleIcon sx={{ fontSize: 40 }} />,
                title: 'Soutenez',
                description: 'Aidez les petits commerces locaux à prospérer',
              },
            ].map((feature, index) => (
              <Box
                key={index}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: designTokens.borderRadius.xl,
                  p: 4,
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: designTokens.transitions.base,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: designTokens.typography.fontWeight.bold,
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                    lineHeight: designTokens.typography.lineHeight.relaxed,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
