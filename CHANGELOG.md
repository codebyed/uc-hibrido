# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-25

### Added
- Initial project structure with multiple React Native/Expo applications
- **convite**: Birthday invitation app with Expo
- **titulo**: Title component app with Expo
- **x**: Multi-component app (Button, Header, Card, ProfileCard) with Expo
- **js**: JavaScript learning exercises (introduction, objects, decision structures, repetition structures, challenges)
- **fixacao**: Submodule for practice exercises
- **outros**: Submodule for other exercises
- **projeto**: Submodule for main project
- **y**: Submodule for additional exercises

### Project Structure
```
uc-hibrido/
├── convite/          # Expo app - Birthday Invitation
├── titulo/           # Expo app - Title Component
├── x/                # Expo app - UI Components (Button, Header, Card, ProfileCard)
├── js/               # JavaScript exercises
├── fixacao/          # Submodule - Practice exercises
├── outros/           # Submodule - Other exercises
├── projeto/          # Submodule - Main project
└── y/                # Submodule - Additional exercises
```

### Technical Details
- All Expo apps use TypeScript and React Native
- ESLint configured for code quality
- Metro bundler for fast development
- Expo Router for navigation (where applicable)