import * as yup from "yup";
import {reactive} from "vue";
import {BooleanSchema, NumberSchema, StringSchema} from "yup";

export class Validator {
  constructor(obj, initial) {
    initial = initial || {};
    this.rules = yup.object().shape(obj);
    this.state = reactive(this.createObject(obj, initial))
    this.errors = reactive(this.createObject(obj, {}))
  }

  createObject(template, initial) {
    const obj = {}
    for (let key of Object.keys(template)) {
      let fallback = ''
      if (template[key] instanceof BooleanSchema) {
        fallback = false
      } else if (template[key] instanceof NumberSchema) {
        fallback = 0
      }

      obj[key] = initial[key] || fallback
    }
    return obj
  }

  validateField(field) {
    this.rules.validateAt(field, this.state).then(() => {
      this.errors[field] = "";
    }).catch(err => {
      this.errors[field] = err.message;
    })
  }

  validate() {
    try {
      this.rules.validateSync(this.state)
      return null
    } catch (err) {
      return err.message
    }
  }

  success() {
    for (const key of Object.keys(this.errors)) {
      if (this.errors[key]) {
        return false
      }
    }
    return true
  }

  cast() {
    return this.rules.cast(this.state)
  }
}
