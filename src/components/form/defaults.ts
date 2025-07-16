import {extendByRecord} from "@sjsf/form/lib/resolver";
// export {resolver} from "@sjsf/form/resolvers/basic";
import MyStringField from "components/form/my-string-field.svelte";
import MyNumberField from "components/form/my-number-field.svelte";
import MyEnumField from "components/form/my-enum-field.svelte";

import "@sjsf/form/fields/extra-fields/enum-include";
import "@sjsf/form/fields/extra-fields/file-include";
import "@sjsf/basic-theme/extra-widgets/textarea-include";
import "@sjsf/basic-theme/extra-widgets/file-include";
import {createFormValidator} from "@sjsf/ajv8-validator";
import {theme as daisyTheme} from "@sjsf/daisyui5-theme";

export {resolver} from "./resolvers.ts";


export {translation} from "@sjsf/form/translations/en";


// NOTE: One validator will be used for all forms
export const validator = createFormValidator();


export const theme = extendByRecord(daisyTheme, {
    myStringField: MyStringField,
    myNumberField: MyNumberField,
    myEnumField: MyEnumField
})

