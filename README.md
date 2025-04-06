# Sandwich App

A React Native application for sandwich enthusiasts to create, share, and collaborate on sandwich recipes ("hoagies").

## Features

- **Authentication**: User registration and login
- **Sandwich Feed**: Browse and discover sandwiches created by other users
- **Create Sandwiches**: Add your own sandwich recipes with ingredients and photos
- **Collaboration**: Invite other users to collaborate on sandwich recipes
- **Comments**: Discuss and provide feedback on sandwiches

## Tech Stack

- **Frontend**: React Native, TypeScript
- **State Management**: Redux + Redux Persist
- **API Integration**: React Query, Axios
- **Navigation**: React Navigation
- **UI Components**: Native components with custom styling

## System Architecture

```
┌─────────────────────────────┐
│          Components         │    UI Components (HoagieCard, etc.)
└───────────────┬─────────────┘
                │
┌───────────────▼─────────────┐
│           Screens           │    Screen Components (FeedTab, etc.)
└───────────────┬─────────────┘
                │
┌───────────────▼─────────────┐
│         Navigation          │    App Navigation & Routing
└───────────────┬─────────────┘
                │
┌───────────────▼─────────────┐
│        State Management     │    Redux & React Query
├─────────────────────────────┤
│ ┌─────────┐    ┌──────────┐ │
│ │  Redux  │    │  Query   │ │
│ │  Store  │    │  Client  │ │
│ └────┬────┘    └────┬─────┘ │
└──────┼───────────────┼──────┘
       │               │
┌──────▼───────────────▼──────┐
│        API Services         │    API Calls & Data Fetching
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│         Backend API         │    External REST API
└─────────────────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- React Native development environment
- iOS/Android emulator or physical device
- Xcode 14+ (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS)
- JDK 11 (for Android)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/sandwich-app.git
cd sandwich-app
```

2. Install dependencies:

```sh
npm install --legacy-peer-deps
```

3. For iOS, install CocoaPods dependencies:

```sh
cd ios
rm -rf build/ Pods/ DerivedData/
pod install
cd ..
npx react-native start
npx react-native run-ios
```

### Environment Setup

1. Create a `.env` file in the project root:

```sh
API_URL=http://localhost:3000/v1
```

2. Make sure you have the React Native CLI installed:

```sh
npm install -g react-native-cli
```

### Environment Variables

The app uses environment variables to manage configuration settings. These variables are stored in the `.env` file in the project root and are automatically loaded into the app at build time.

#### Available Environment Variables

- `API_URL`: The base URL for API requests (e.g., `https://api.sandwichapp.com/v1`)

#### Adding New Environment Variables

1. Add the variable to the `.env` file:

   ```
   API_URL=https://api.sandwichapp.com/v1
   MY_NEW_VARIABLE=some_value
   ```

2. Add the variable to the TypeScript declaration file at `src/types/env.d.ts`:

   ```typescript
   declare module '@env' {
     export const API_URL: string;
     export const MY_NEW_VARIABLE: string;
   }
   ```

3. Import and use the variable in your code:

   ```typescript
   import {MY_NEW_VARIABLE} from '@env';

   console.log(MY_NEW_VARIABLE);
   ```

#### Security Considerations

- Do not commit sensitive information like API keys or secrets in the `.env` file
- Add `.env` to your `.gitignore` file (it's already included by default)
- For production builds, consider using environment-specific files (`.env.production`, `.env.staging`)

### Running the App

1. Start Metro server:

```sh
npm start
# or
npx react-native start
```

2. Run on iOS:

```sh
# Run on iPhone simulator
npm run ios
# or
npx react-native run-ios

# Run on specific device
npx react-native run-ios --device "iPhone 15"

# Run specific simulator
npx react-native run-ios --simulator "iPhone 15 Pro Max"
```

3. Run on Android:

```sh
# Make sure you have an Android emulator running or a device connected
npm run android
# or
npx react-native run-android

# Run on specific device/emulator
npx react-native run-android --deviceId=emulator-5554
```

### Troubleshooting

#### iOS Build Issues

1. If you encounter build errors, try cleaning the build:

```sh
cd ios
xcodebuild clean -workspace SandwichApp.xcworkspace -scheme SandwichApp
cd ..
```

2. Make sure your CocoaPods are updated:

```sh
gem install cocoapods
cd ios
pod deintegrate
pod install
cd ..
```

#### Android Build Issues

1. If you encounter build errors, try cleaning the build:

```sh
cd android
./gradlew clean
cd ..
```

2. Make sure your local.properties file exists in the android folder with the correct SDK path:

```
# Create or edit android/local.properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

3. Ensure proper Java version:

```sh
java -version
# Should output Java 11 or compatible version
```

## Project Structure

```
src/
├── components/      # Reusable UI components
│   └── ui/          # Base UI components (Button, Card, etc.)
├── constants/       # App constants and styles
├── navigation/      # Navigation configuration
├── screens/         # Screen components
├── services/        # API services
├── store/           # Redux store configuration
├── styles/          # Shared styles
└── types/           # TypeScript type definitions
```

## State Management

### Redux

Redux is used for global app state that needs to persist across sessions, such as authentication. We use Redux Toolkit for efficient Redux setup and Redux Persist to maintain state across app restarts.

Key slices:

- **Auth**: Manages user authentication state

### React Query

React Query (TanStack Query) is used for server state management, providing:

- Data fetching with automatic caching
- Background refetching
- Pagination and infinite scrolling support
- Mutation capabilities with automatic cache invalidation

## Code Quality and Optimizations

- **TypeScript**: Strict type checking with no `any` types allowed
- **Component Optimization**:
  - `React.memo` for component memoization
  - `useCallback` and `useMemo` for stable function references and computed values
  - Proper state management to minimize re-renders
- **Performance**:
  - Virtualized lists for handling large datasets
  - Image optimization
  - Lazy loading for non-critical components
- **Error Handling**:
  - Error boundaries for graceful error recovery
  - Consistent API error handling

## Testing

Run tests with:

```sh
npm test
```

We use Jest and React Native Testing Library for:

- Component unit tests
- Integration tests
- Service and utility tests

## Build and Deployment

### iOS

1. Open Xcode project:

```sh
open ios/SandwichApp.xcworkspace
```

2. Select the appropriate scheme and device
3. Archive for distribution

### Android

1. Generate a release build:

```sh
cd android
./gradlew assembleRelease
```

The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Native Team
- React Navigation
- Redux Toolkit
- TanStack Query
