This is an art bookmark app using Rijks museum api

# Getting Started
## Step 0: .env 
```bash
cp .env.example .env
```
Insert provided env variables

## Step 1: Install Node modules
```bash
yarn install
```
## Step 2: Install Pods
```bash
cd ios
pod install
```
## Step 3: Start project
### For iOS
```bash
# Navigate to root of the project and run:
yarn ios
# OR using Xcode
xed ios 
```

![simulator_screenshot_430EBDBA-7F01-4240-98D6-C250D78773AD](https://github.com/KevTiv/rijks_museum/assets/62612841/9b778726-6fd8-4927-ba8c-22c579c94097)

### API
Refer to [rijks museum api](https://data.rijksmuseum.nl/object-metadata/api/).


### Screens
#### Home Screen
Refer to above screenshot
#### Bookmark screen
List of saved bookmarked art piece, cliking on a art tile direct you to the art piece page. 
User actions available are remove bookmark, download image to photo gallery, and basic artist or art name filter search.

![simulator_screenshot_0F97C34C-41B6-4F36-9C4E-66BB1A7B0068](https://github.com/KevTiv/rijks_museum/assets/62612841/cb28ce3f-7395-4016-9a41-6fa7e8a6352b)

![simulator_screenshot_7669203D-5B10-40A4-9CFD-08E1B7DE142D](https://github.com/KevTiv/rijks_museum/assets/62612841/a2748946-1f6e-45b0-832f-2050d526d8e3)

![simulator_screenshot_5F8C995D-A548-44EF-96DE-A0F4FA4B55B5](https://github.com/KevTiv/rijks_museum/assets/62612841/d976b35d-d746-45b5-8928-8aec171b3e82)

#### Artist screen
List of Art related to a specific artist

![simulator_screenshot_B348F7B2-6347-45D5-A531-32EED443B2B4](https://github.com/KevTiv/rijks_museum/assets/62612841/2d18bce0-12d8-4ab5-b078-1288abb19bb4)

#### Art screen
Art Piece details screen, Clicking on the Artisit name navigates you to the Artist screen, you can bookmark the art or download image to your photo gallery.

![simulator_screenshot_B2B8DE1A-680E-4976-AA5B-D7A9FF1645BF](https://github.com/KevTiv/rijks_museum/assets/62612841/4f764270-3b79-44f4-9629-e7ff2ce62d3f)

# Animation Features
#### Gesture container
- Gesture container that allows for gestures such as panning and
rotating on Art Screen image, and it uses the 
react-native-reanimated library to provide animations and gestures. 

#### Theme animation switch
- Gesture and tap sensitve theme animation toggle

#### GLSL Shader Animation
- Using Shader container in Art Screen, add a GLSL shader adapted to 
Skia SKSL running on the UI thread. React shader update based on 
requestAnimationFrame.


![Animations](https://github.com/KevTiv/rijks_museum/assets/62612841/847fc4e1-58a2-4b53-94a3-f97222948284)



