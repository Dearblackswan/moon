import React from 'react';
import Form from "@rjsf/fluent-ui";
import { JSONSchema7 } from "json-schema";


const uiSchema = {
  "simple": {
    "credit_card": {
      "ui:help": "If you enter anything here then billing_address will be dynamically added to the form."
    }
  },
  "conditional": {
    "Do you want to get rid of any?": {
      "ui:widget": "radio"
    }
  },
  "arrayOfConditionals": {
    "items": {
      "Do you want to get rid of any?": {
        "ui:widget": "radio"
      }
    }
  }
}


const schema: JSONSchema7 =  {
"title": "Schema ",
"description": "",
"type": "object",
"properties": {
  "simple": {
    "title": "Simple",
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "credit_card": {
        "type": "number"
      }
    },
    "required": [
      "name"
    ],
    "dependencies": {
      "credit_card": {
        "properties": {
          "billing_address": {
            "type": "string"
          }
        },
        "required": [
          "billing_address"
        ]
      }
    }
  },
  "conditional": {
    "title": "Conditional",
    "$ref": "#/definitions/person"
  },
  "arrayOfConditionals": {
    "title": "Array of conditionals",
    "type": "array",
    "items": {
      "$ref": "#/definitions/person"
    }
  }
},
"definitions": {
  "person": {
    "title": "Person",
    "type": "object",
    "properties": {
      "Do you have any pets?": {
        "type": "string",
        "enum": [
          "No",
          "Yes: One",
          "Yes: More than one"
        ],
        "default": "No"
      }
    },
    "required": [
      "Do you have any pets?"
    ],
    "dependencies": {
      "Do you have any pets?": {
        "oneOf": [
          {
            "properties": {
              "Do you have any pets?": {
                "enum": [
                  "No"
                ]
              }
            }
          },
          {
            "properties": {
              "Do you have any pets?": {
                "enum": [
                  "Yes: One"
                ]
              },
              "How old is your pet?": {
                "type": "number"
              }
            },
            "required": [
              "How old is your pet?"
            ]
          },
          {
            "properties": {
              "Do you have any pets?": {
                "enum": [
                  "Yes: More than one"
                ]
              },
              "Do you want to get rid of any?": {
                "type": "boolean"
              }
            },
            "required": [
              "Do you want to get rid of any?"
            ]
          }
        ]
      }
    }
  }
}
};

function App() {
  return (
    
      <Form schema={schema} uiSchema={uiSchema} />

  );
}

export default App;
