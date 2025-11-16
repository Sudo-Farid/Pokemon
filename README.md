# 🎮 Pokedex

A modern, interactive web application for exploring the world of Pokémon, developed as a learning project. Browse through hundreds of Pokémon, search for your favorites, and discover detailed information about each one in a beautiful, user-friendly interface.

## ✨ Features

- **Pokémon Gallery**: Browse through Pokémon cards displayed in an elegant grid layout
- **Infinite Scroll**: Load more Pokémon with the "Load More" button (20 Pokémon per batch)
- **Smart Search**: Real-time search functionality that filters Pokémon by name (minimum 3 characters)
- **Detailed View**: Click on any Pokémon card to view comprehensive details including:
  - **About Tab**: Species, height, weight, and abilities
  - **Stats Tab**: Visual representation of HP, Attack, and Defense with progress bars
- **Keyboard Navigation**: 
  - `←` / `→` Arrow keys to navigate between Pokémon in detail view
  - `ESC` to close the detail modal
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations for better user experience
- **Type-based Styling**: Each Pokémon card is color-coded based on its primary type

## 🚀 Getting Started

### Prerequisites

No build tools or dependencies required! This is a pure vanilla JavaScript application that runs directly in the browser.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Pokemon
```

2. Open `index.html` in your web browser:
   - Simply double-click the `index.html` file, or
   - Use a local development server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

## 📖 Usage

1. **Browse Pokémon**: The application automatically loads the first 20 Pokémon on page load
2. **Load More**: Click the "Load More" button to fetch additional Pokémon (20 at a time)
3. **Search**: Type at least 3 characters in the search box to filter Pokémon by name
4. **View Details**: Click on any Pokémon card to open a detailed modal view
5. **Navigate**: Use the arrow buttons or keyboard arrow keys to browse through Pokémon in detail view
6. **Close**: Click the X button, press ESC, or click outside the modal to close

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties and animations
- **Vanilla JavaScript**: No frameworks or libraries required
- **PokeAPI**: [pokeapi.co](https://pokeapi.co) - Free RESTful API for Pokémon data
- **Responsive CSS**: Mobile-first responsive design

## 📁 Project Structure

```
Pokemon/
├── assets/
│   ├── CSS/
│   │   └── responsive.css      # Responsive styles
│   ├── images/                 # Images and icons
│   ├── UtilsJS/
│   │   ├── helpers.js          # Utility functions
│   │   └── templateJS.js       # HTML template generators
│   ├── loading-animation.gif   # Loading animation
│   └── manifest.json           # PWA manifest
├── includes/
│   ├── header.html             # Header component
│   └── footer.html             # Footer component
├── index.html                  # Main HTML file
├── script.js                   # Main application logic
└── style.css                   # Main stylesheet
```

## 🎯 Key Features Explained

### Search Functionality
- Debounced search (500ms delay) for optimal performance
- Searches through all available Pokémon names
- Minimum 3 characters required to trigger search
- Automatically resets to default view when search is cleared

### Detail Modal
- Displays comprehensive Pokémon information
- Tabbed interface for different information categories
- Circular navigation (last Pokémon → first Pokémon)
- Smooth animations and transitions

### Performance Optimizations
- Efficient API calls with proper error handling
- Debounced search to reduce API requests
- Lazy loading of Pokémon data
- Optimized image loading

## 🌐 API

This project uses the [PokeAPI](https://pokeapi.co), a free and open-source RESTful API that provides comprehensive Pokémon data. The application fetches data from:

- Base URL: `https://pokeapi.co/api/v2/pokemon`
- Endpoints used:
  - List endpoint: `/pokemon?limit={limit}&offset={offset}`
  - Individual Pokémon: `/pokemon/{name}`

## 🎨 Customization

The application is highly customizable:

- **Colors**: Modify CSS variables in `style.css` to change the color scheme
- **Layout**: Adjust grid settings in `style.css` to change card layout
- **Pagination**: Modify the `limit` constant in `script.js` to change how many Pokémon load per batch

## 📱 Progressive Web App

The application includes a `manifest.json` file, making it installable as a Progressive Web App (PWA) on supported devices.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co) for providing the amazing Pokémon data API
- Pokémon is a trademark of Nintendo, Game Freak, and The Pokémon Company

---

**Enjoy exploring the world of Pokémon!** 🎮✨

