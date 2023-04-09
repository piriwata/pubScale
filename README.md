# PubScale
PubScale is a lightweight plugin that allows you to seamlessly insert, update, and delete markdown text in Obsidian into PlanetScale tables. You can leverage PlanetScale as a content management store and Obsidian as your preferred content editor.

## Features
- Manage and synchronize your markdown files edited in Obsidian with PlanetScale
- Specialized integration with PlanetScale for easy setup
- Full control over which notes are synced with PlanetScale

## Setup
To get started with PubScale, follow these simple steps:

1. Install the PubScale plugin through the Obsidian Community Plugins.
2. Configure the plugin by adding your PlanetScale credentials and choosing the desired database and table.
3. Open the note you want to sync with PlanetScale.

## Usage
### Insert a note
Access the Command Palette and select `PubScale: Insert`. This will insert the active note into your PlanetScale table.

### Update a note
Access the Command Palette and select `PubScale: Update`. This will update the active note in your PlanetScale table. Note that PubScale identify notes by their title. If you change the title of a note, PubScale will insert a new note into your PlanetScale table. 

### Delete a note
Access the Command Palette and select `PubScale: Delete`. This will delete the active note from your PlanetScale table.

## Support
For any issues or feature requests, please create an issue in the repository.

## License
This project is licensed under the MIT License.
