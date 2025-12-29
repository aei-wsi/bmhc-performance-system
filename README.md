# BMHC Contract-Aligned Performance System

A React-based performance management system designed for Black Men's Health Clinic (BMHC) to track contractor performance against contract obligations with evidence-based KPI monitoring and automated review generation.

## 🎯 Overview

This system streamlines the performance review process by:
- Mapping contract obligations to measurable KPIs
- Tracking performance metrics with evidence documentation
- Auto-generating narrative performance reviews
- Providing visual dashboards for performance monitoring

## ✨ Features

### 📊 Dashboard View
- Real-time KPI performance overview
- Color-coded status indicators (Exceeding, Meeting, Needs Improvement, Non-Compliant)
- Performance trends and progress tracking
- Evidence-based metrics with completion rates

### 📝 Contract Obligation Mapper
- Upload and parse contract documents
- Extract key performance obligations
- Link obligations to measurable KPIs
- Define measurement criteria and frequencies

### 📄 Automated Review Generation
- Generate narrative performance reviews from KPI data
- Include strengths, areas meeting expectations, and development needs
- Add supervisor notes and contextual observations
- Export reviews to PDF format

## 🛠️ Technical Stack

- **React** - UI framework
- **Lucide React** - Icon library
- **JavaScript/JSX** - Programming language
- **CSS-in-JS** - Styling solution

## 🎨 Design System

The application uses BMHC's brand identity:
- **Primary Color**: Black (#000000)
- **Accent Color**: Gold (#D4AF37)
- **Typography**: Montserrat (headings), Open Sans (body)
- **Status Colors**: 
  - Gold - Exceeding expectations
  - Black - Meeting expectations
  - Orange - Needs improvement
  - Red - Non-compliant

## 📦 Installation

### Option 1: Standalone Component
```bash
# Copy the component into your React project
cp bmhc-performance-system.jsx src/components/
```

### Option 2: New React App
```bash
# Create new React app
npx create-react-app bmhc-performance-system
cd bmhc-performance-system

# Install dependencies
npm install lucide-react

# Replace src/App.js with bmhc-performance-system.jsx
# Rename to App.js and adjust imports

# Start the development server
npm start
```

## 🚀 Usage

### Quick Start
```jsx
import App from './bmhc-performance-system';

function Main() {
  return <App />;
}
```

### Sample Data Structure

The system includes sample data for demonstration:

```javascript
// Sample Contractor
{
  contractor: "John Smith",
  role: "Community Health Worker",
  startDate: "2024-01-15",
  contractType: "Part-time"
}

// Sample KPI
{
  id: 1,
  name: "Weekly Report Completion",
  target: 100,
  actual: 92,
  percentage: 92,
  status: "meeting",
  evidence: "Completed 46 of 50 weekly reports...",
  trend: "improving"
}
```

## 📋 Current Features

### Implemented ✅
- Dashboard with KPI cards and metrics
- Status indicators with color coding
- Progress bars and trend tracking
- Contract obligation display
- Sample data structures
- Responsive design with BMHC branding
- Auto-generated review narratives
- Supervisor notes section

### Planned 🔄
- File upload processing (CSV, DOCX, PDF)
- Database integration
- User authentication and role management
- Actual PDF export functionality
- Data entry forms for logging evidence
- Integration with existing BMHC systems
- Historical performance tracking
- Comparative analytics

## 🔐 Security Considerations

This is a Stage 1 prototype. For production use:
- Implement proper authentication (OAuth, SSO)
- Add role-based access control
- Secure API endpoints
- Encrypt sensitive contractor data
- Add audit logging
- Implement data retention policies

## 📊 Data Privacy

The system handles contractor performance data. Ensure compliance with:
- HIPAA regulations (if applicable)
- Employee privacy laws
- Data retention requirements
- Internal BMHC policies

## 🤝 Contributing

This is an internal BMHC tool. For contributions:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Roadmap

### Phase 1: Foundation (Current)
- ✅ Core UI components
- ✅ Sample data and workflows
- ✅ Basic navigation

### Phase 2: Data Integration
- [ ] File upload processing
- [ ] Database schema design
- [ ] API endpoints
- [ ] Data validation

### Phase 3: Advanced Features
- [ ] PDF export
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Analytics dashboard

### Phase 4: Production
- [ ] User authentication
- [ ] Role management
- [ ] Audit logging
- [ ] Production deployment

## 🐛 Known Issues

- File upload is UI-only (no processing implemented)
- PDF export is placeholder functionality
- No backend/database connection
- Sample data only (no real contractor data)

## 📄 License

Internal use only - Black Men's Health Clinic

## 👥 Authors

- **Development Team** - Black Men's Health Clinic

## 🙏 Acknowledgments

- Designed for BMHC contractor performance management
- Built with React and modern web technologies
- Inspired by evidence-based performance review best practices

## 📞 Support

For questions or issues:
- Internal BMHC IT Support
- Project Repository Issues

## 🔄 Version History

- **v1.0.0** (2024-12-29)
  - Initial prototype release
  - Core UI implementation
  - Sample data structures
  - BMHC branding integration
  - Logo embedded as base64

---

**BMHC - Care You Can Trust** 🏥✨
