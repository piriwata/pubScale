
# PubScale for Obsidian

PubScale is a lightweight plugin that allows you to seamlessly insert, update, and delete markdown text in Obsidian vault into PlanetScale tables. You can leverage PlanetScale as a content storage and Obsidian as your preferred content editor.　Note that this plugin is not intended to use planetScale to back up your vault.

## Features

- Store and manage your markdown files in your vault into PlanetScale
- Specialized integration with PlanetScale for easy setup
- Full control over which notes are synced with PlanetScale

## Setup

To get started with PubScale, follow these steps:

1. Create a table in the planetScale database to store your obsidian notes. The table name can be freely set. Column names are currently fixed for `title` and `content`.
   For example, enter the following command in the planetScale console. 
   ```
   CREATE TABLE posts (
     title varchar(255) NOT NULL PRIMARY KEY,
     content TEXT NOT NULL
   );
   ```
2. Install the PubScale plugin through the Obsidian Community Plugins.
3. Configure the plugin by adding your PlanetScale credentials and the desired database and table.
4. Open the note you want to sync with PlanetScale.

## Usage

### Publish a note

To publish a note, access the Command Palette and select "PubScale: Publish an active note to PlanetScale". This will update the active note in your PlanetScale table. Note that PubScale identifies notes by their title. If you change the title of a note, PubScale will insert a new note into your PlanetScale table.

### Delete a note

To delete a note, access the Command Palette and select "PubScale: Delete an active note from PlanetScale". This will delete the active note from your PlanetScale table.

## Support

For any issues or feature requests, please create an issue in the repository.

## License

This project is licensed under the MIT License.
