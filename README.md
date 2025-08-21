# Region Settings Prototype

A fully interactive region settings component built from Figma design specifications. This prototype demonstrates advanced UI interactions for managing regional server deployments with enabled regions and base region selection.

![Region Settings Demo](https://via.placeholder.com/800x600.png?text=Region+Settings+Prototype)

## 🚀 Features

### Interactive Components
- **Collapsible Continent Sections**: Expandable/collapsible regions with smooth animations
- **Region Selection**: Toggle individual cities/countries within each continent
- **BASE Region Management**: Exclusive base region selection (one per continent)
- **Real-time Search**: Filter regions and cities instantly
- **Bulk Actions**: Enable/disable all regions or base locations at once
- **Live Counters**: Dynamic count updates for enabled and base regions

### Realistic Data
- **Europe**: Amsterdam, Berlin, Paris, Rome, London, Madrid, Vienna, Copenhagen
- **North America**: New York, Los Angeles, Chicago, Toronto, Vancouver, Mexico City
- **Asia**: Tokyo, Singapore, Seoul, Mumbai, Hong Kong, Bangkok, Shanghai
- **Africa**: Cape Town, Cairo, Lagos, Nairobi, Casablanca
- **Oceania**: Sydney, Melbourne, Auckland, Brisbane

### Technical Highlights
- **Vanilla JavaScript**: No frameworks, pure JS for maximum compatibility
- **CSS Variables**: Modern styling with CSS custom properties
- **Responsive Design**: Mobile-friendly layout with breakpoints
- **Accessibility**: Full keyboard navigation and ARIA support
- **Smooth Animations**: CSS transitions and keyframe animations

## 🛠️ Tech Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox, CSS Grid, and custom properties
- **Vanilla JavaScript**: ES6+ features for interactive functionality
- **Font Awesome**: Icon library for UI elements
- **Inter Font**: Professional typography via Google Fonts

## 📂 Project Structure

```
figma-workflow-1-tutorial/
├── regions/
│   ├── index.html          # Main HTML structure
│   ├── styles.css          # Complete stylesheet
│   └── script.js          # JavaScript functionality
├── README.md              # Project documentation
└── .gitignore            # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/figma-region-settings.git
   cd figma-region-settings
   ```

2. **Run with Live Server**
   - **VS Code**: Install "Live Server" extension, right-click `regions/index.html` → "Open with Live Server"
   - **Python**: `cd regions && python3 -m http.server 8000`
   - **Node.js**: `cd regions && npx http-server -p 8000`

3. **Open in browser**
   - Navigate to `http://localhost:8000` (or the URL provided by your server)

## 🎮 How to Use

### Basic Interactions
- **Expand Regions**: Click continent headers to view cities
- **Select Regions**: Click checkboxes to enable/disable individual locations
- **Set Base Region**: Click BASE badges to designate primary servers (one per continent)
- **Search**: Type in the search box to filter locations
- **Bulk Actions**: Use "Enable all" and "Clear all" buttons for quick changes

### Advanced Features
- **Exclusive Base Selection**: Only one base region per continent can be active
- **Smart Counters**: Counts update automatically as you make selections  
- **Keyboard Navigation**: Tab through elements, Enter to activate
- **Search Filtering**: Real-time filtering across all regions and cities

## 🎨 Design System

### Colors
- **Primary**: `#243342` (Text Strong)
- **Secondary**: `#364e65` (Text Body) 
- **Accent**: `#2fc584` (Success Green)
- **Base Blue**: `#2563eb` (Active Base Badge)
- **Background**: `#ffffff` (Container)
- **Border**: `#e6e9ec` (Weak), `#cdd3d8` (Strong)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: Regular (400), Medium (500), Semi-bold (600)
- **Sizes**: 12px-18px with appropriate line heights

## 🚧 Development

### File Structure
- `index.html`: Complete semantic markup with proper ARIA labels
- `styles.css`: Organized CSS with logical sections and comments
- `script.js`: Modular JavaScript class with clear method separation

### Key Classes
- **RegionSettings**: Main application class handling all interactions
- **Event Handlers**: Separate methods for different interaction types
- **Counter Management**: Automatic updating of region and base counts
- **State Management**: Proper tracking of enabled/disabled states

## 📱 Browser Support

- ✅ **Chrome** 80+
- ✅ **Firefox** 75+
- ✅ **Safari** 13+
- ✅ **Edge** 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design specifications from Figma
- Inter font family by Rasmus Andersson
- Font Awesome for iconography
- Modern CSS techniques and best practices

---

**Built with ❤️ for demonstrating production-ready prototyping from design to code**
