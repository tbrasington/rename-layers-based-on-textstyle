{
    "compatibleVersion": 3,
    "bundleVersion": 1,
    "icon": "icon.png",
    "commands": [
      {
        "name": "Append",
        "identifier": "append-identifier",
        "script": "./append.js"
      }, 
      {
        "name": "Prepend",
        "identifier": "prepend-identifier",
        "script": "./prepend.js"
      }, 
      {
        "name": "Replace",
        "identifier": "replace-identifier",
        "script": "./replace.js"
      }
    ],
    "menu": {
      "title": "Rename text layers from Text Style",
      "items": [
        "append-identifier",
        "prepend-identifier",
        "replace-identifier"
      ]
    }
  }