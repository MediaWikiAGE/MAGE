/// This library implements functionality for page generators: ways one could
/// obtain a list of pages to operate on.
///
/// This library will be called from a renderer process (unless otherwise
/// specified).

const pageGenerators = [];
const pageGeneratorsById = {};

/// Generator data structure:
/// - id: string. Kebab-case ID of the page generator. Must be unique.
/// - name: string. Capitalized short description of the generator like
///   "Transcluding pages" or "Pages that link to page".
/// - description: string. Currently does nothing.
/// - parameters: array of parameter objects
/// - generatePages: function(argument object) -> array of page names
///
/// Parameter object structure:
/// - id: string. The ID of the generator parameter, preferably a valid
///   identifier. IDs must be unique within one generator, but the same ID may
///   be used for parameters in different generators. For example, generator A
///   must not have two parameters with ID x, but generators A and B may have
///   one parameter each with ID x.
/// - type: string. Special handling:
///     - "integer": the parameter is input from a `number` field. For such
///       parameters, the properties `min` and `max` may be specified, in which
///       case they must be numbers that will be used for input validation.
///     - "boolean": the parameter is input from a checkbox.
///   Every other value makes the parameter treated as a generic string.
/// - name: string. Capitalized short description of the parameter like "Target
///   page" or "Replace with".
/// - description: string. Currently does nothing.
/// - default: the "default" value for the parameter. For non-string fields,
///   must be valid according to type and validation constraints.
///
/// Argument objects map generator-specific parameter IDs to values the
/// parameters take. For example, if a generator specified a boolean parameter
/// "uppercase" and an integer parameter "limit", then the argument object must
/// have a boolean property "uppercase" and an integer property "limit".
function registerPageGenerator(generatorData) {
  pageGenerators.push(generatorData);
  pageGeneratorsById[generatorData.id] = generatorData;
}

registerPageGenerator({
  id: "numbers",
  name: "Numbers",
  description: "Test generator. Produces a list of integers from 1 to a specified limit.",
  parameters: [{
      id: "limit",
      type: "integer",
      name: "Limit",
      description: "The integer to stop at.",
      min: 1,
      default: 5
    }
  ],
  generatePages: function(params) {
    const pages = [];
    for (let i = 1; i <= params.limit; i++) {
      pages.push(i.toString());
    }
    return pages;
  }
});

registerPageGenerator({
  id: "letters",
  name: "Letters",
  description: "Test generator. Produces a list of letters from A to a specified letter.",
  parameters: [
    {
      id: "isUppercase",
      type: "boolean",
      name: "Uppercase",
      description: "Use uppercase Latin letters instead of lowercase Latin letters.",
      default: true
    },
    {
      id: "limit",
      type: "integer",
      name: "Limit",
      description: "The index of the letter to stop at. 1 for A, 2 for B, etc. Maximum value is 26 for Z.",
      min: 1,
      max: 26,
      default: 4
    }
  ],
  generatePages: function(params) {
    const baseCodePoint = (params.isUppercase ? "A" : "a").codePointAt(0);
    const pages = [];
    for (let i = 0; i < params.limit; i++) {
      pages.push(String.fromCodePoint(baseCodePoint + i));
    }
    return pages;
  }
});

registerPageGenerator({
  id: "transcluding-pages",
  name: "Transcluding pages",
  description: "Pages that transclude the specified page.",
  parameters: [
    {
      id: "targetPage",
      type: "pagename",
      name: "Template",
      description: "The full page name for the page (typically a template) transcluded on other pages",
      default: ""
    }
  ],
  generatePages: function(params) {
    // TODO unimplemented
    return [];
  }
});

export function listGenerators() {
  const generatorList = [];
  for (const generator of pageGenerators) {
    generatorList.push({
      id: generator.id,
      name: generator.name,
      description: generator.description
    });
  }
  return generatorList;
}

export function getGeneratorParameters(generatorId) {
  const generator = pageGeneratorsById[generatorId];
  const generatorParams = [];
  for (const param of generator.parameters) {
    generatorParams.push(Object.assign(param));
  }
  return generatorParams;
}

export function generatePages(generatorId, params) {
  return pageGeneratorsById[generatorId].generatePages(params);
}
