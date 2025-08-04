# Resume Parser & Compatibility Analyzer

A modern, responsive web application for parsing resumes and calculating compatibility scores with job descriptions. Features dark/light mode, internationalization (English/French), and comprehensive environment configuration.

## ✨ Features

### 📄 Resume Parsing
- Upload PDF resumes with drag-and-drop support
- Extract and parse resume data with AI-powered analysis
- View structured resume information in JSON format
- Professional data presentation

### 🎯 Compatibility Scoring
- Compare resumes with job descriptions
- Calculate compatibility scores with visual indicators
- Color-coded score display (Green for excellent, Orange for good, Red for poor)
- Detailed analysis results with breakdown

### 🎨 Theme System
- **Light Mode**: Clean, professional light theme
- **Dark Mode**: Modern dark theme with purple accents
- Automatic theme persistence
- Smooth theme transitions
- Accessible color schemes

### 🌍 Internationalization
- **English**: Full English translation
- **French**: Complete French translation
- Language persistence
- Dynamic text replacement
- Parameterized translations

### 🎨 Theme & Language Toggles
- **Direct Access**: Theme and language toggles are directly accessible at the top of the application
- **Theme Toggle**: Click the theme button (🌙/☀️) in the top-right corner to switch between light and dark modes
- **Language Toggle**: Click the language button (🇺🇸/🇫🇷) to switch between English and French
- **Real-time Changes**: All theme and language changes are applied immediately across the entire application
- **Persistence**: Settings are automatically saved to localStorage
- **Visual Feedback**: Hover effects and smooth transitions provide clear user feedback
- **Fixed Positioning**: Toggles are always visible in the top-right corner for easy access

### 🎨 Full-Screen Experience
- **Full Viewport Coverage**: Application takes up the entire screen with responsive design
- **Prominent Theme Display**: Dark/light mode changes are immediately visible across the entire interface
- **Language Toggles**: Current language is clearly displayed and easily toggleable
- **Smooth Transitions**: All theme and language changes include smooth animations
- **Direct Controls**: No modal or settings panel - toggles are directly accessible
- **Fixed Positioning**: Theme and language toggles are always visible in the top-right corner

### 🔄 Reset Functionality
- Clear all form data and results
- Reset file inputs
- Start fresh analysis
- Maintains user preferences

## 🎨 Responsive Design

The application is fully responsive and optimized for all screen sizes:

### 📱 Mobile (≤480px)
- Compact layout with smaller text and buttons
- Stacked button layout for better touch interaction
- Reduced padding and margins
- Optimized touch targets (44px minimum)
- Simplified navigation

### 📱 Tablet (481px - 768px)
- Medium-sized components
- Balanced spacing and typography
- Responsive form elements
- Adaptive button layouts

### 💻 Desktop (>768px)
- Full-featured layout with enhanced visual hierarchy
- Larger components and spacing
- Advanced hover effects
- Professional typography

## 🛠️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-domain.com
VITE_PARSE_RESUME_ENDPOINT=/api/parse_resume
VITE_COMPATIBILITY_SCORE_ENDPOINT=/api/get_compatibility_score

# Application Configuration
VITE_APP_NAME=Your App Name
VITE_APP_VERSION=1.0.0
VITE_APP_ORIGIN=https://your-app-domain.com

# Request Configuration
VITE_REQUEST_TIMEOUT=60000
VITE_MAX_FILE_SIZE=10485760

# Development Configuration
VITE_DEV_MODE=true
VITE_ENABLE_LOGGING=true

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_TRANSLATIONS=true
VITE_DEFAULT_LANGUAGE=en
```

### Environment Variables Explained

| Variable | Description | Default | Type |
|----------|-------------|---------|------|
| `VITE_API_BASE_URL` | Base URL for API calls | `https://your-api-domain.com` | string |
| `VITE_PARSE_RESUME_ENDPOINT` | Resume parsing endpoint | `/api/parse_resume` | string |
| `VITE_COMPATIBILITY_SCORE_ENDPOINT` | Compatibility scoring endpoint | `/api/get_compatibility_score` | string |
| `VITE_APP_NAME` | Application title | `Your App Name` | string |
| `VITE_APP_VERSION` | Application version | `1.0.0` | string |
| `VITE_APP_ORIGIN` | Application origin for CORS | `https://your-app-domain.com` | string |
| `VITE_REQUEST_TIMEOUT` | Request timeout in milliseconds | `60000` | number |
| `VITE_MAX_FILE_SIZE` | Maximum file size in bytes | `10485760` (10MB) | number |
| `VITE_DEV_MODE` | Development mode flag | `true` | boolean |
| `VITE_ENABLE_LOGGING` | Enable console logging | `true` | boolean |
| `VITE_ENABLE_DARK_MODE` | Enable dark mode feature | `true` | boolean |
| `VITE_ENABLE_TRANSLATIONS` | Enable internationalization | `true` | boolean |
| `VITE_DEFAULT_LANGUAGE` | Default language | `en` | string |

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-parser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables**
   Edit `.env` file with your API endpoints and preferences

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📱 Responsive Breakpoints

| Breakpoint | Screen Size | Features |
|------------|-------------|----------|
| Mobile | ≤480px | Compact layout, stacked buttons, smaller text |
| Tablet | 481px - 768px | Medium components, balanced spacing |
| Desktop | >768px | Full layout, larger components |

## 🎯 Compatibility Score Ranges

| Score Range | Label | Color | Description |
|-------------|-------|-------|-------------|
| 80-100% | Excellent Match | Green | Perfect fit for the position |
| 60-79% | Good Match | Orange | Strong candidate with minor gaps |
| 40-59% | Fair Match | Red | Some relevant experience |
| 0-39% | Poor Match | Red | Limited relevant experience |

## 🎨 Theme System

### Light Theme
- **Primary**: `#667eea` (Blue)
- **Secondary**: `#764ba2` (Purple)
- **Success**: `#27ae60` (Green)
- **Warning**: `#f39c12` (Orange)
- **Error**: `#e74c3c` (Red)
- **Background**: `#ffffff` (White)
- **Surface**: `#f8f9fa` (Light Gray)

### Dark Theme
- **Primary**: `#8b5cf6` (Purple)
- **Secondary**: `#a855f7` (Violet)
- **Success**: `#10b981` (Emerald)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Background**: `#0f172a` (Dark Blue)
- **Surface**: `#1e293b` (Slate)

## 🌍 Internationalization

### Supported Languages
- **English (en)**: Default language
- **French (fr)**: Complete French translation

### Translation Features
- Dynamic text replacement
- Parameterized translations
- Language persistence
- Context-aware translations

### Translation Keys
- App titles and navigation
- Form labels and placeholders
- Button text and actions
- Error messages and notifications
- Loading states and feedback
- Results and analysis text

## 🏗️ Application Architecture

### 📁 Project Structure
```
src/
├── components/          # Reusable UI components
│   └── SettingsPanel.jsx
├── config/             # Configuration files
│   └── uiConfig.js     # UI themes, translations, and settings
├── contexts/           # React Context providers
│   └── AppContext.jsx  # Theme and language context
├── ResumeParser.jsx    # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

### 🎯 Architecture Principles
- **Separation of Concerns**: UI configuration separated from environment variables
- **Component Modularity**: Reusable components with clear responsibilities
- **Context-Based State**: Global state management with React Context
- **Configuration-Driven**: Environment variables for all external dependencies
- **Responsive-First**: Mobile-first design with progressive enhancement
- **Accessibility-First**: WCAG compliant design patterns
- **Performance-Optimized**: Efficient rendering and state management

## 🔧 Technical Features

- **React 18** with modern hooks and context
- **Vite** for fast development and building
- **Environment Variables** for configuration management
- **Responsive Design** with CSS-in-JS styling
- **Theme System** with light/dark mode support
- **Internationalization** with English/French support
- **Error Handling** with detailed logging and user feedback
- **File Validation** with size and type checking
- **Loading States** with animated spinners
- **Request Tracking** with IDs and timestamps
- **Accessibility** with proper ARIA labels and keyboard navigation

## ⚙️ Vite Configuration

The application uses Vite with environment-driven proxy configuration:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: true,
        headers: {
          'Origin': process.env.VITE_APP_ORIGIN,
          'Referer': process.env.VITE_APP_ORIGIN,
        }
      }
    }
  }
})
```

### Proxy Configuration
- **Environment-Driven**: Uses `VITE_API_BASE_URL` for target
- **CORS Handling**: Automatic origin and referer headers
- **Secure**: HTTPS support with proper certificates
- **Development**: Local development with hot reload

## 📊 API Endpoints

### Parse Resume
- **Method**: POST
- **Endpoint**: `/api/parse_resume`
- **Body**: `multipart/form-data`
- **Field**: `resume` (PDF file)
- **Response**: JSON with parsed resume data

### Compatibility Score
- **Method**: POST
- **Endpoint**: `/api/get_compatibility_score`
- **Body**: `multipart/form-data`
- **Fields**: 
  - `resume` (PDF file)
  - `job_description` (JSON string)
- **Response**: JSON with compatibility analysis

## 🎨 UI Components

- **Tab Navigation**: Switch between parsing and compatibility
- **File Upload**: Drag-and-drop PDF upload with validation
- **Form Inputs**: Responsive textarea components with themes
- **Button Groups**: Action and reset buttons with loading states
- **Score Display**: Visual compatibility indicators with color coding
- **Loading States**: Animated spinners with contextual messages
- **Error Handling**: User-friendly error messages with details
- **Settings Panel**: Theme and language controls
- **Responsive Layout**: Adaptive design for all screen sizes

## 🔒 Security Features

- File type validation (PDF only)
- File size limits (configurable via environment)
- Request timeout protection
- Error boundary handling
- Input sanitization
- XSS prevention
- CSRF protection (via proper headers)

## 📈 Performance Optimizations

- Responsive image loading
- Efficient state management with React hooks
- Debounced resize handlers
- Optimized re-renders with proper dependencies
- Memory leak prevention with cleanup functions
- Lazy loading of components
- Code splitting for better bundle size

## 🐛 Troubleshooting

### Common Issues

1. **File Upload Fails**
   - Check file size limits in environment variables
   - Ensure PDF format (only PDF files accepted)
   - Verify network connection and API endpoint
   - Check browser console for detailed errors

2. **API Errors**
   - Verify environment variables are correctly set
   - Check API endpoints are accessible
   - Ensure server is running and responding
   - Review network tab for request details

3. **Theme/Language Issues**
   - Clear browser localStorage
   - Check environment flags are enabled
   - Verify translation files are loaded
   - Test with different browsers

4. **Responsive Issues**
   - Clear browser cache and cookies
   - Test on different devices and screen sizes
   - Check CSS media queries are working
   - Verify viewport meta tag is present

### Debug Mode
Enable debug mode by setting `VITE_DEV_MODE=true` in your environment file for detailed console logging.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test on multiple screen sizes and browsers
5. Ensure translations are updated for both languages
6. Test theme switching functionality
7. Submit a pull request

### Development Guidelines
- Follow React best practices
- Maintain responsive design principles
- Update translations for new text
- Test theme compatibility
- Ensure accessibility standards
- Add proper error handling
- Include loading states

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)
- [Responsive Design Principles](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Internationalization Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

---

Built with ❤️ using React, Vite, and modern web technologies 