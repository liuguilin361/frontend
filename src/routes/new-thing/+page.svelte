<script lang="ts">
    import Form from "components/form/form.svelte";
    import Dialogbar from "components/dialogbar.svelte";
    import type {Schema, UiSchema} from "@sjsf/form";


    let schema: Schema = {
        "properties": {

            "password": {
                "description": "description app password",
                "type": "string"
            },
            "username": {
                "description": "description app username",
                "type": "string"
            },
            "data": {
                "description": "Number of things to add",
                "type": "number"
            },
            "type": {
                "description": "description enum type",
                "type": "string",
                "enum": [
                    "string",
                    "number",
                    "boolean",
                    "object",
                    "array"
                ],
            },
        },

        "required": [
            "data",
            "username",
            "password",
            "type"
        ],
        "type": "object"
    };

    // const uiSchema: UiSchema = {
    //     "ui:components": {
    //         stringField: "stringField",
    //     }
    // }


</script>

<Dialogbar>New Things</Dialogbar>


<Form {schema}></Form>
