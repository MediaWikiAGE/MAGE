/// This library implements functionality for page tasks: actions one could
/// perform on a page.
///
/// This library will be called from a renderer process (unless otherwise
/// specified).
///
/// Unfortunately, it's very similar to the page generators library and has some
/// duplicated code.

const pageTasks = [];
const pageTasksById = {};

function registerPageTask(taskData) {
  pageTasks.push(taskData);
  pageTasksById[taskData.id] = taskData;
}

registerPageTask({
  id: "double-pagename",
  name: "Double numbers in page name",
  description: "If the page has numbers in its name, it's moved to the title where the numbers are doubled. So 'Left 4 Dead 2' would become 'Left 8 Dead 4'.",
  parameters: [],
  processPage(pageData, params) {
    pageData.title = pageData.title.replaceAll(/[1-9][0-9]+/g, (match) => String(Number(match)*2));
  }
});

registerPageTask({
  id: "text-find-and-replace",
  name: "Find and replace in text",
  description: "Find all instances of a string in the page source and replace them with the target string. No regex or advanced feature support, this is just for testing.",
  parameters: [
    {
      id: "toFind",
      type: "string",
      name: "Looking for...",
      description: "The string you want to replace.",
      default: ""
    },
    {
      id: "replaceWith",
      type: "string",
      name: "Replacing with...",
      description: "The string you want to replace the searched string with.",
      default: ""
    }
  ],
  processPage(pageData, params) {
    pageData.text = pageData.text.replaceAll(params.toFind, params.replaceWith);
  }
});

registerPageTask({
  id: "null-edit",
  name: "Null edit",
  description: "Save an \"edit\" without making any actual changes to purge server-side cache.",
  parameters: [],
  processPage(pageData, params) {
    pageData.nullEdit = true;
  }
});

export function listTasks() {
  const taskList = [];
  for (const task of pageTasks) {
    taskList.push({
      id: task.id,
      name: task.name,
      description: task.description
    });
  }
  return taskList;
}

export function getTaskParameters(taskId) {
  const task = pageTasksById[taskId];
  const taskParams = [];
  for (const param of task.parameters) {
    taskParams.push(Object.assign(param));
  }
  return taskParams;
}

export function getTaskInfoById(taskId) {
  const task = pageTasksById[taskId];
  const taskInfo = {
    name: task.name,
    description: task.description
  };
  return taskInfo;
}

function runTasks(pageData, taskList) {

}
