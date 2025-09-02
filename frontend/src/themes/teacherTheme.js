// Teacher Panel Theme Configuration
export const teacherTheme = {
  // Color Palette
  colors: {
    primary: '#00b894',      // Teal green - main brand color
    primaryLight: '#00d2a0',
    primaryDark: '#00a085',
    secondary: '#0984e3',    // Blue - secondary actions
    secondaryLight: '#74b9ff',
    accent: '#fdcb6e',       // Yellow - warnings/highlights
    
    // Backgrounds
    background: '#f7f8fa',   // Main background
    surface: '#ffffff',      // Cards, modals
    surfaceHover: '#f8f9fa',
    
    // Sidebar
    sidebarBg: '#1a1a1a',
    sidebarText: '#ffffff',
    sidebarActive: 'rgba(0,184,148,0.15)',
    sidebarBorder: '#333333',
    
    // Text Colors
    textPrimary: '#2d3436',
    textSecondary: '#636e72',
    textMuted: '#b2bec3',
    textLight: '#ffffff',
    
    // Status Colors
    success: '#00b894',
    warning: '#fdcb6e',
    error: '#e17055',
    info: '#0984e3',
    
    // Interactive Elements
    border: '#ddd',
    borderLight: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
  },
  
  // Typography
  typography: {
    fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  
  // Component Styles
  components: {
    // Sidebar
    sidebar: {
      width: '240px',
      background: '#1a1a1a',
      color: '#ffffff',
      minHeight: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    },
    
    // Main Content Area
    mainContent: {
      marginLeft: '240px',
      padding: '2.5rem',
      flex: 1,
      background: '#f7f8fa',
      minHeight: '100vh',
    },
    
    // Cards
    card: {
      background: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      padding: '1.5rem',
      border: '1px solid #e2e8f0',
    },
    
    // Buttons
    button: {
      primary: {
        background: '#00b894',
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 184, 148, 0.2)',
      },
      secondary: {
        background: '#0984e3',
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(9, 132, 227, 0.2)',
      },
      warning: {
        background: '#fdcb6e',
        color: '#2d3436',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(253, 203, 110, 0.2)',
      },
      danger: {
        background: '#e17055',
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(225, 112, 85, 0.2)',
      },
    },
    
    // Form Elements
    input: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      color: '#2d3436',
      transition: 'all 0.2s ease',
      outline: 'none',
    },
    
    // Tables
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: '#ffffff',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    },
    
    // Modals
    modal: {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(45, 52, 54, 0.6)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '2rem',
        minWidth: '420px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      }
    },
    
    // Status Badges
    badge: {
      present: {
        background: '#00b894',
        color: '#ffffff',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 600,
      },
      absent: {
        background: '#e17055',
        color: '#ffffff',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 600,
      },
    }
  },
  
  // Animations
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideIn: 'slideInFromRight 0.3s ease-out',
    bounce: 'bounce 0.5s ease-in-out',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// Helper functions for applying theme styles
export const getButtonStyle = (variant = 'primary', customStyles = {}) => ({
  ...teacherTheme.components.button[variant],
  ...customStyles,
});

export const getCardStyle = (customStyles = {}) => ({
  ...teacherTheme.components.card,
  ...customStyles,
});

export const getInputStyle = (customStyles = {}) => ({
  ...teacherTheme.components.input,
  ...customStyles,
});

export const getModalStyle = () => teacherTheme.components.modal;

export const getBadgeStyle = (type = 'present') => teacherTheme.components.badge[type];

export default teacherTheme;
