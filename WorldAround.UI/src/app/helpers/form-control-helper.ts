import { FormGroup } from "@angular/forms";

export class FormControlHelper {

  static mapToModel(model: any, group: FormGroup): void {

    Object.keys(group.controls).forEach((key) => {
      model[key] = group.get(key).value;
    });

    return model;
  }
}
