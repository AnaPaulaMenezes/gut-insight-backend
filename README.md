# 🚀 GutInsight Backend API

> **Track your gut health journey with precision and insight**

A modern, clean-architecture backend API for symptom tracking and gut health monitoring. Built with TypeScript, Express, and domain-driven design principles.

![API Status](https://img.shields.io/badge/status-development-orange?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)
![Express](https://img.shields.io/badge/Express-5.2.1-black?style=flat-square)

## 🌟 Features

- **📊 Symptom Tracking**: Record multiple symptoms with intensity levels and notes
- **🔍 Advanced Filtering**: Filter records by date range, symptom type, and user
- **🏗️ Clean Architecture**: Domain-driven design with clear separation of concerns
- **💾 JSON Persistence**: File-based storage for development and demo purposes
- **🔒 Type Safety**: Full TypeScript implementation with strict typing
- **🚀 RESTful API**: Well-designed endpoints following REST principles

## 🏛️ Architecture

This project follows **Clean Architecture** principles with clear separation of layers:

```
src/
├── domain/           # Business logic & entities
│   ├── entity/       # Domain entities (SymptomRecord)
│   └── repository/   # Repository interfaces
├── application/      # Use cases & application logic
│   └── use-case/     # Business use cases
├── infra/           # Infrastructure layer
│   └── repository/   # Repository implementations
└── interface/       # Interface adapters
    ├── controller/   # HTTP controllers
    └── routes/       # Route definitions
```

## 📡 API Endpoints

### Symptom Records

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/symptom-records` | Register a new symptom record |
| `GET` | `/symptom-records` | List symptom records with filtering |

### Request/Response Examples

#### Register Symptom Record
```bash
POST /symptom-records
Content-Type: application/json

{
  "userId": "user-123",
  "recordAt": "2026-03-05T10:30:00Z",
  "symptoms": [
    {
      "symptom": "bloating",
      "intensity": 7,
      "notes": "Mild discomfort after lunch"
    },
    {
      "symptom": "fatigue",
      "intensity": 5
    }
  ],
  "notes": "Had dairy products today"
}
```

#### List Symptom Records
```bash
GET /symptom-records?userId=user-123&fromDate=2026-03-01T00:00:00Z&toDate=2026-03-31T23:59:59Z&symptom=bloating
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm**
- **TypeScript** 5.9+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gut-insight-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run start:dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

The API will be available at `http://localhost:3000` 🚀

## 🧪 Testing with Postman

Import the provided `postman_collection.json` to test all endpoints:

```bash
# The collection includes:
✅ Register Symptom Record
✅ List All Records
✅ Filter by Date Range
✅ Filter by Symptom Type
```

## 📁 Project Structure

```
gut-insight-backend/
├── data/
│   └── records.json          # JSON storage for symptom records
├── src/
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Dependency injection container
│   ├── routes.ts            # Route configuration
│   ├── domain/
│   │   ├── entity/
│   │   │   └── symptom-record.ts    # Core domain entity
│   │   └── repository/
│   │       └── symptom-record.repository.ts  # Repository interface
│   ├── application/
│   │   └── use-case/
│   │       └── symptom-record/
│   │           ├── register-symptom-record.usecase.ts
│   │           ├── list-symptom-record.usecase.ts
│   │           └── model/           # DTOs and models
│   ├── infra/
│   │   └── repository/
│   │       └── symptom-record-json.repository.ts  # JSON implementation
│   └── interface/
│       ├── controller/
│       │   └── symptom-record.controller.ts
│       └── symptom-record.route.ts
├── postman_collection.json  # API testing collection
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Development

### Available Scripts

```bash
npm run start:dev    # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm test             # Run tests (when implemented)
```

### Key Technologies

- **Express.js** - Web framework for Node.js
- **TypeScript** - Typed JavaScript for better development experience
- **Clean Architecture** - Maintainable and testable code structure
- **Domain-Driven Design** - Business logic focused development
- **JSON File Storage** - Simple persistence for development

## 🔧 Configuration

### Environment Variables

Currently, the application uses file-based storage. For production deployment, consider:

- Database integration (PostgreSQL, MongoDB)
- Environment-specific configurations
- API versioning
- Authentication & authorization

### Data Storage

Symptom records are stored in `data/records.json`. The structure includes:
- Unique record IDs
- User identification
- Timestamp tracking
- Symptom details with intensity levels
- Optional notes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Maintain clean architecture principles
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📈 Future Enhancements

- [ ] **Database Integration**: Replace JSON with PostgreSQL/MongoDB
- [ ] **Authentication**: JWT-based user authentication
- [ ] **Advanced Analytics**: Symptom pattern analysis and insights
- [ ] **Mobile App**: React Native companion app
- [ ] **Data Visualization**: Charts and graphs for symptom trends
- [ ] **Export Features**: CSV/PDF export of symptom data
- [ ] **Notifications**: Reminders for symptom tracking
- [ ] **Multi-user Support**: Healthcare provider dashboards

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.


**Made with 💚 for healthier guts everywhere**

*Track • Analyze • Improve • Thrive*</content>
<parameter name="filePath">c:\workspace\gut-insight-backend\README.md