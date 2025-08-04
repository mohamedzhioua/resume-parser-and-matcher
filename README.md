# Resume Parser & Compatibility Analyzer

A modern, enterprise-grade React application for parsing resumes and analyzing job compatibility scores. Built with Vite, featuring a clean architecture, comprehensive error handling, and internationalization support.

## 🚀 Features

### Core Functionality
- **Resume Parsing**: Upload and analyze PDF resumes with detailed extraction
- **Compatibility Scoring**: Calculate job compatibility scores based on resume and job requirements
- **Multi-language Support**: French and English interfaces
- **Theme Switching**: Light and dark mode support
- **Real-time Processing**: Live feedback during API operations

### Technical Excellence
- **Proxy Configuration**: Intelligent API routing for development and production
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Validation**: Robust input validation and file type checking
- **Logging**: Detailed request tracking and debugging capabilities
- **Responsive Design**: Modern UI with smooth animations and transitions

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ResumeParser.jsx
│   ├── CompatibilityScore.jsx
│   ├── FileUpload.jsx
│   ├── LoadingSpinner.jsx
│   ├── ErrorDisplay.jsx
│   └── index.js
├── services/           # API and business logic layer
│   └── api.js
├── hooks/              # Custom React hooks
│   ├── useTheme.js
│   └── useLanguage.js
├── utils/              # Utility functions
│   ├── logger.js
│   └── validation.js
├── constants/          # Application constants
│   └── index.js
├── types/              # Type definitions
│   └── index.js
├── styles/             # CSS files
│   ├── App.css
│   └── index.css
├── config.js           # Configuration management
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

### Design Patterns

#### Component Architecture
- **Separation of Concerns**: UI components separated from business logic
- **Reusability**: Modular components with consistent interfaces
- **Composition**: Complex features built from simple, focused components

#### State Management
- **Custom Hooks**: Encapsulated state logic for theme and language
- **Local State**: Component-specific state management
- **Error Boundaries**: Graceful error handling throughout the application

#### API Layer
- **Service Pattern**: Centralized API communication
- **Request Tracking**: Unique request IDs for debugging
- **Timeout Handling**: Configurable request timeouts
- **Error Mapping**: User-friendly error messages

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **CSS Variables**: Dynamic theming system
- **ES6+**: Modern JavaScript features

### Development Tools
- **pnpm**: Fast, disk space efficient package manager
- **Git**: Version control with semantic commits
- **Environment Variables**: Secure configuration management

### API Integration
- **RESTful APIs**: Standard HTTP communication
- **FormData**: File upload handling
- **CORS Handling**: Cross-origin request management
- **Proxy Configuration**: Development server routing

## 📋 Prerequisites

### System Requirements
- Node.js 16+ 
- pnpm package manager
- Modern web browser with ES6+ support

### Environment Setup
- `.env` file with required API configuration
- Network access to backend services
- Valid SSL certificates for production

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd resume-parser-app

# Install dependencies
pnpm install
```

### Environment Configuration
Create a `.env` file in the project root with the following variables:

**Required Variables:**
- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_PARSE_RESUME_ENDPOINT`: Resume parsing endpoint
- `VITE_COMPATIBILITY_SCORE_ENDPOINT`: Compatibility scoring endpoint
- `VITE_REQUEST_TIMEOUT`: API request timeout (milliseconds)
- `VITE_MAX_FILE_SIZE`: Maximum file upload size (bytes)

**Optional Variables:**
- `VITE_APP_NAME`: Application display name
- `VITE_APP_VERSION`: Application version
- `VITE_DEV_MODE`: Development mode flag
- `VITE_ENABLE_LOGGING`: Debug logging toggle

### Development
```bash
# Start development server
pnpm run dev

# Access application
# Open http://localhost:5174 in your browser
```

### Production Build
```bash
# Create production build
pnpm run build

# Preview production build
pnpm run preview
```

## 🔧 Configuration

### API Endpoints
The application supports two main API endpoints:
- **Resume Parser**: Processes PDF resumes and extracts structured data
- **Compatibility Score**: Analyzes resume-job compatibility and returns scores

### Proxy Configuration
Development environment uses Vite proxy for:
- CORS handling
- Request routing
- Debug logging

### File Upload Limits
- **File Type**: PDF only
- **Maximum Size**: 10MB (configurable)
- **Validation**: Client-side and server-side checks

## 🌐 Internationalization

### Supported Languages
- **French (fr)**: Default language
- **English (en)**: Secondary language

### Translation Features
- Dynamic language switching
- Context-aware translations
- Consistent terminology across components

## 🎨 Theming

### Theme System
- **Light Mode**: Default theme with high contrast
- **Dark Mode**: Alternative theme for low-light environments
- **CSS Variables**: Dynamic theme switching
- **Consistent Design**: Unified color palette and typography

### UI Components
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Mobile-friendly design
- **Smooth Animations**: CSS transitions and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation

## 🔍 Error Handling

### Error Categories
- **Network Errors**: Connection timeouts and network issues
- **API Errors**: Server-side errors and invalid responses
- **Validation Errors**: File type and size validation
- **User Errors**: Invalid input and missing required fields

### Error Display
- **User-Friendly Messages**: Clear, actionable error descriptions
- **Request Tracking**: Unique request IDs for debugging
- **Error Recovery**: Automatic retry mechanisms
- **Fallback States**: Graceful degradation for failed operations

## 📊 Performance

### Optimization Features
- **Code Splitting**: Lazy-loaded components
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Caching**: Browser caching for static assets
- **Request Optimization**: Debounced API calls and request deduplication

### Monitoring
- **Request Logging**: Detailed API call tracking
- **Performance Metrics**: Load times and user interactions
- **Error Tracking**: Comprehensive error reporting
- **User Analytics**: Feature usage and engagement metrics

## 🔒 Security

### Security Measures
- **Environment Variables**: Secure configuration management
- **Input Validation**: Client-side and server-side validation
- **File Upload Security**: Type checking and size limits
- **CORS Configuration**: Proper cross-origin request handling

### Best Practices
- **No Hardcoded Secrets**: All sensitive data in environment variables
- **HTTPS Only**: Secure communication in production
- **Content Security Policy**: XSS protection
- **Regular Updates**: Dependency vulnerability management

## 🧪 Testing Strategy

### Testing Approach
- **Component Testing**: Individual component validation
- **Integration Testing**: API integration verification
- **User Acceptance Testing**: End-to-end workflow validation
- **Performance Testing**: Load time and responsiveness checks

### Quality Assurance
- **Code Review**: Peer review process
- **Linting**: Code style and quality enforcement
- **Type Checking**: Runtime type validation
- **Documentation**: Comprehensive code documentation

## 📈 Scalability

### Architecture Benefits
- **Modular Design**: Easy feature addition and modification
- **Service Layer**: Centralized business logic
- **Component Reusability**: Shared UI components
- **Configuration Driven**: Environment-based settings

### Future Enhancements
- **TypeScript Migration**: Enhanced type safety
- **State Management**: Redux or Zustand integration
- **Testing Framework**: Jest and React Testing Library
- **CI/CD Pipeline**: Automated deployment and testing

## 🤝 Contributing

### Development Guidelines
- **Code Style**: Consistent formatting and naming conventions
- **Component Structure**: Reusable and maintainable components
- **Documentation**: Comprehensive code comments and README updates
- **Testing**: Unit tests for new features

### Pull Request Process
- **Feature Branches**: Separate branches for new features
- **Code Review**: Mandatory peer review process
- **Testing**: Automated and manual testing requirements
- **Documentation**: Updated documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Comprehensive inline documentation
- **Issues**: GitHub issue tracking for bugs and feature requests
- **Discussions**: Community support and feature discussions
- **Wiki**: Extended documentation and tutorials

### Contact Information
- **Repository**: GitHub project page
- **Issues**: Bug reports and feature requests
- **Discussions**: Community support forum
- **Email**: Direct contact for urgent issues

---

**Built with ❤️ using modern web technologies** 