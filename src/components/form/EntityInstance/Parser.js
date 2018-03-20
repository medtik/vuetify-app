import {setConfigUsingValidation, ControlParser} from "@aquarelle/json-form";

export default class extends ControlParser {

    constructor(name, entity = null, display = {}) {
        super(name);
        this._entity = entity;
        this._display = display;
    }

    getDisplay(definition, form) {
        return {...this._display, ...super.getDisplay(definition, form)};
    }

    getDefault(definition) {
        if (definition.config && definition.config.multiple) {
            return Array.isArray(definition.default) ? definition.default : [];
        }
        return definition.default || undefined;
    }

    getConfig(definition) {
        return {
            multiple: false,
            entity: this._entity,
            ...definition.config
        };
    }

    getItems(definition, form, data, validator) {
        return [];
    }

    parse(definition, form, validator) {
        const data = super.parse(definition, form, validator);
        if (data.config.multiple) {
            setConfigUsingValidation(data.config, definition.validation, ['required', 'minItems', 'maxItems']);
        }
        else {
            setConfigUsingValidation(data.config, definition.validation, ['required']);
        }
        return data;
    }
}
