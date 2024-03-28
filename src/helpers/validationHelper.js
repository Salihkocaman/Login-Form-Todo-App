function isValidEmail(email) {
    var emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const validate = (form, rules, errors) => {
    let isValid = true;

    const validators = {
      required(value) {
        if (value === "" || value == null) {
          return "This field is required.";
        }
        return null;
      },
      min(value, length) {
        if (value.length < length) {
          return `This field should have a minimum of ${length} characters.`;
        }
        return null;
      },
      email(value) {
        if (!isValidEmail(value)) {
          return "Email must be a valid email address.";
        }
        return null;
      },
    };

    Object.keys(rules).forEach((field) => {
      let fieldValue = form[field];
      errors[field] = [];

      rules[field].forEach((rule) => {
        const [ruleName, ruleValue] = rule.split(":");
        const validator = validators[ruleName];

        if (validator) {
          const errorMessage = validator(fieldValue, ruleValue);
          if (errorMessage) {
            isValid = false;
            errors[field].push(errorMessage);
          }
        }
      });

      if (errors[field].length === 0) {
        delete errors[field];
      }
    });

    return isValid;
  };

  export { validate };
