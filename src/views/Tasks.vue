<template>
  <div id="taskwindow" class="flex h-full">

    <div id="pagelist" class="flex flex-col w-1/3 mx-1 flex-grow-0 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <h2 class="mx-auto my-1 text-2xl">Pages</h2>
      <textarea class="border border-gray-400 dark:border-gray-300 h-full mx-1 resize-none text-sm font-mono my-auto dark:bg-gray-700" :value="taskPages.join('\n')" @input="onPageListAreaInput"></textarea>
      <div class="flex">
        <button class="mt-1 mx-auto flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600 flex" title="Generate page list" @click="generatorModalOpen = true">
          <svg-icon width="32" height="32" icon="plus" />
        </button>
      </div>
    </div>

    <div id="tasklist" class="flex flex-col w-2/3 mx-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <h2 class="mx-auto my-1 text-2xl">Current Tasks</h2>
      <div class="overflow-y-auto my-1">
        <div v-for="(task, index) in tasks" :key="task.internalId">
          <div v-if="expandedTasks[task.internalId]" class="flex flex-col bg-gray-200 dark:bg-gray-700 mx-1 my-0.5 px-1 py-1">
            <div class="flex justify-between">
              <button class="flex-shrink-0 opacity-60"><svg-icon width="24" height="24" icon="drag-indicator" /></button>
              <h3 class="text-lg mx-auto">Task {{index+1}}: {{task.name}}</h3>
              <button class="flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Collapse" @click="collapseTask(task.internalId)"><svg-icon width="24" height="24" icon="chevron-double-up" /></button>
            </div>
            <p class="mt-1 mb-3">{{task.description}}</p>
            <ul v-if="Object.keys(task.params).length > 0">
              <li v-for="(param, paramName) in task.params" :key="paramName"><strong>{{paramName}}:</strong> <span class="font-mono">{{param}}</span></li>
            </ul>
            <div class="flex justify-between">
              <button class="flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Task options"><svg-icon width="24" height="24" icon="cog" /></button>
              <div class="select-none hover:bg-gray-300 dark:hover:bg-gray-600 px-1">
                <label :for="'task-' + task.internalId + '-enabled'">Enabled? </label>
                <input :id="'task-' + task.internalId + '-enabled'" type="checkbox" v-model="task.enabled">
              </div>
            </div>
          </div>
          <div v-else class="flex justify-between bg-gray-200 dark:bg-gray-700 mx-1 my-0.5 px-1 py-1">
            <button class="flex-shrink-0 opacity-60"><svg-icon width="24" height="24" icon="drag-indicator" /></button>
            <h3 class="text-lg">Task {{index+1}}: {{task.name}}</h3>
            <button class="flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Expand" @click="expandTask(task.internalId)"><svg-icon width="24" height="24" icon="chevron-double-down" /></button>
          </div>
        </div>
      </div>
      <div class="flex mt-auto">
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Options"><svg-icon width="32" height="32" icon="cog" /></button>
        <button class="mr-auto flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Add task" @click="addTaskModalOpen = true"><svg-icon width="32" height="32" icon="document-add" /></button>
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Run or resume tasks" @click="startTasks()"><svg-icon width="32" height="32" icon="play" /></button>
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Pause all tasks to resume later"><svg-icon width="32" height="32" icon="pause" /></button>
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300 dark:hover:bg-gray-600" title="Abort all tasks (loses all progress)"><svg-icon width="32" height="32" icon="stop" /></button>
      </div>
    </div>

  </div>
  <teleport to="body">
    <div v-if="generatorModalOpen" class="fixed inset-0 w-screen h-screen z-10 backdrop-filter backdrop-brightness-50 dark:text-gray-200">
      <div class="fixed inset-0 w-4/5 h-4/5 m-auto bg-white border-2 border-gray-700 dark:border-gray-500 dark:bg-black grid grid-rows-6 grid-cols-2 gap-1">
        <div class="row-start-1 row-end-6 col-start-1 bg-gray-100 dark:bg-gray-900 flex flex-col">
          <div class="bg-indigo-100 dark:bg-indigo-900 text-center">
            <h3 class="text-xl py-1">Page Generators</h3>
          </div>
          <div class="overflow-y-auto mt-1">
            <div v-for="generator in generatorList" :key="generator.id" class="px-1" @click="generatorModalChosenGenerator = generator.id" :class="{'bg-gray-300 dark:bg-gray-500': generatorModalChosenGenerator === generator.id, 'hover:bg-gray-200 dark:hover:bg-gray-600': generatorModalChosenGenerator !== generator.id}">
              <input type="radio" name="page-generator" :id="'page-generator-selector-' + generator.id" v-model="generatorModalChosenGenerator" :value="generator.id" class="absolute opacity-0 w-0 h-0" />
              <label :for="'page-generator-selector-' + generator.id" class="select-none">{{generator.name}}</label>
            </div>
          </div>
        </div>
        <div class="row-start-1 row-end-6 col-start-2 bg-gray-100 dark:bg-gray-900 flex flex-col">
          <div class="bg-indigo-100 dark:bg-indigo-900 text-center">
            <h3 class="text-xl py-1">Generator Options</h3>
          </div>
          <div class="overflow-y-auto mt-1">
            <div v-for="genOption in generatorOptionList" :key="genOption.id" class="mb-1 px-1">
              <div v-if="genOption.type === 'boolean'" class="flex items-center">
                <input :id="getGeneratorOptionInputId(genOption.id)" type="checkbox" v-model="generatorOptionValues[genOption.id]">
                <label :for="getGeneratorOptionInputId(genOption.id)" class="mr-auto pl-1 select-none">{{genOption.name}}</label>
              </div>
              <div v-else-if="genOption.type === 'integer'" class="flex flex-col">
                <label :for="getGeneratorOptionInputId(genOption.id)" class="mr-auto select-none"> {{genOption.name}}</label>
                <input
                  :id="getGeneratorOptionInputId(genOption.id)"
                  type="number"
                  :min="genOption.min"
                  :max="genOption.max"
                  v-model="generatorOptionValues[genOption.id]"
                  class="px-0.5 dark:bg-gray-700"
                >
              </div>
              <div v-else class="flex flex-col">
                <label :for="getGeneratorOptionInputId(genOption.id)" class="mr-auto select-none"> {{genOption.name}}</label>
                <input :id="getGeneratorOptionInputId(genOption.id)" type="text" v-model="generatorOptionValues[genOption.id]" class="px-0.5 dark:bg-gray-700">
              </div>
            </div>
          </div>
        </div>
        <div class="row-start-6 col-start-1 col-end-4 bg-gray-100 dark:bg-gray-900 flex justify-around items-center">
          <button @click="generatePages()" class="select-none bg-gray-300 dark:bg-gray-600 px-1.5 py-0.5 hover:ring ring-gray-200 dark:ring-gray-700">Generate</button>
          <button @click="generatorModalOpen = false" class="select-none bg-gray-300 dark:bg-gray-600 px-1.5 py-0.5 hover:ring ring-gray-200 dark:ring-gray-700">Cancel</button>
        </div>
      </div>
    </div>

    <div v-if="addTaskModalOpen" class="fixed inset-0 w-screen h-screen z-10 backdrop-filter backdrop-brightness-50 dark:text-gray-200">
      <div class="fixed inset-0 w-4/5 h-4/5 m-auto bg-white border-2 border-gray-700 dark:border-gray-500 dark:bg-black grid grid-rows-6 grid-cols-2 gap-1">
        <div class="row-start-1 row-end-6 col-start-1 bg-gray-100 dark:bg-gray-900 flex flex-col">
          <div class="bg-indigo-100 dark:bg-indigo-900 text-center">
            <h3 class="text-xl py-1">Task Types</h3>
          </div>
          <div class="overflow-y-auto mt-1">
            <div v-for="task in taskList" :key="task.id" class="px-1 py-0.5" @click="addTaskModalChosenTask = task.id" :class="{'bg-gray-300 dark:bg-gray-500': addTaskModalChosenTask === task.id, 'hover:bg-gray-200 dark:hover:bg-gray-600': addTaskModalChosenTask !== task.id}">
              <input type="radio" name="page-task" :id="'page-task-selector-' + task.id" v-model="addTaskModalChosenTask" :value="task.id" class="absolute opacity-0 w-0 h-0" />
              <label :for="'page-task-selector-' + task.id" class="select-none">{{task.name}}</label>
            </div>
          </div>
        </div>
        <div class="row-start-1 row-end-6 col-start-2 bg-gray-100 dark:bg-gray-900 flex flex-col">
          <div class="bg-indigo-100 dark:bg-indigo-900 text-center">
            <h3 class="text-xl py-1">Task Options</h3>
          </div>
          <div class="overflow-y-auto mt-1">
            <div v-for="taskOption in taskOptionList" :key="taskOption.id" class="mb-1 px-1">
              <div v-if="taskOption.type === 'boolean'" class="flex items-center">
                <input :id="getTaskOptionInputId(taskOption.id)" type="checkbox" v-model="taskOptionValues[taskOption.id]">
                <label :for="getTaskOptionInputId(taskOption.id)" class="mr-auto pl-1 select-none">{{taskOption.name}}</label>
              </div>
              <div v-else-if="taskOption.type === 'integer'" class="flex flex-col">
                <label :for="getTaskOptionInputId(taskOption.id)" class="mr-auto select-none"> {{taskOption.name}}</label>
                <input
                  :id="getTaskOptionInputId(taskOption.id)"
                  type="number"
                  :min="taskOption.min"
                  :max="taskOption.max"
                  v-model="taskOptionValues[taskOption.id]"
                  class="px-0.5 dark:bg-gray-700"
                >
              </div>
              <div v-else class="flex flex-col">
                <label :for="getTaskOptionInputId(taskOption.id)" class="mr-auto select-none"> {{taskOption.name}}</label>
                <input :id="getTaskOptionInputId(taskOption.id)" type="text" v-model="taskOptionValues[taskOption.id]" class="px-0.5 dark:bg-gray-700">
              </div>
            </div>
          </div>
        </div>
        <div class="row-start-6 col-start-1 col-end-4 bg-gray-100 dark:bg-gray-900 flex justify-around items-center">
          <button @click="addTask()" class="select-none bg-gray-300 dark:bg-gray-600 px-1.5 py-0.5 hover:ring ring-gray-200 dark:ring-gray-700">Add Task</button>
          <button @click="addTaskModalOpen = false" class="select-none bg-gray-300 dark:bg-gray-600 px-1.5 py-0.5 hover:ring ring-gray-200 dark:ring-gray-700">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
import * as pageGenerators from "@/libraries/pageGenerators.js";
import * as pageTasks from "@/libraries/pageTasks.js";

export default {
  components: { SvgIcon },
  data() {
    return {
      generatorModalOpen: false,
      generatorModalChosenGenerator: "numbers",
      addTaskModalOpen: false,
      addTaskModalChosenTask: "null-edit",
      expandedTasks: {},
      tasks: [],
      taskPages: [],
      runningTasks: false
    };
  },
  computed: {
    generatorList() {
      return pageGenerators.listGenerators();
    },
    generatorOptionList() {
      return pageGenerators.getGeneratorParameters(this.generatorModalChosenGenerator);
    },
    generatorOptionValues() {
      const options = this.generatorOptionList;
      const defaultValues = {};
      for (const option of options) {
        defaultValues[option.id] = option.default;
      }
      return defaultValues;
    },
    taskList() {
      return pageTasks.listTasks();
    },
    taskOptionList() {
      return pageTasks.getTaskParameters(this.addTaskModalChosenTask);
    },
    taskOptionValues() {
      const options = this.taskOptionList;
      const defaultValues = {};
      for (const option of options) {
        defaultValues[option.id] = option.default;
      }
      return defaultValues;
    }
  },
  methods: {
    getGeneratorOptionInputId(optionId) {
      return `generator-option-${this.generatorModalChosenGenerator}-${optionId}`;
    },
    getTaskOptionInputId(optionId) {
      return `task-option-${this.addTaskModalChosenTask}-${optionId}`;
    },
    onPageListAreaInput(event) {
      // An empty textarea results in a one-element array with an empty string,
      // which leads to an extra newline at the top if the list is filled from a
      // generator.
      let pageArray = event.target.value.split("\n");

      if (pageArray.length === 1 && pageArray[0] === "") {
        pageArray = [];
      }

      this.taskPages = pageArray;
    },
    expandTask(internalId) {
      this.expandedTasks[internalId] = true;
    },
    collapseTask(internalId) {
      this.expandedTasks[internalId] = false;
    },
    generatePages() {
      const pages = pageGenerators.generatePages(this.generatorModalChosenGenerator, this.generatorOptionValues);
      for (const page of pages) {
        if (!this.taskPages.includes(page)) {
          this.taskPages.push(page);
        }
      }
      this.generatorModalOpen = false;
    },
    addTask() {
      const task = pageTasks.getTaskInfoById(this.addTaskModalChosenTask);
      task.internalId = this.tasks.length;
      // Intentional JSON parse/stringify to allow for deep copying and prevent
      // unwanted reactivity from affecting prior tasks of the same type.
      task.params = JSON.parse(JSON.stringify(this.taskOptionValues));
      task.enabled = true;

      this.tasks.push(task);
      this.addTaskModalOpen = false;
    },
    startTasks() {
      this.runningTasks = true;
      console.log("Starting tasks for page list.");
      for (const page of this.taskPages) {
        const pageData = {};
        pageData.title = page;
        console.log(`Starting tasks for page '${pageData.title}'.`);
        pageData.text = page;
        console.log(`Mock page text for testing: ${pageData.text}.`);

        for (const task of this.tasks) {
          if (!task.enabled) {
            console.log(`Task with internal ID ${task.internalId} is disabled, skipping.`);
            continue;
          }
          console.log(`Running task with internal ID ${task.internalId} and ID ${task.id}.`);
          const preTaskPageData = JSON.parse(JSON.stringify(pageData));
          pageTasks.runTask(pageData, task.id, task.params);
          let actionTaken = false;
          if (pageData.title !== preTaskPageData.title) {
            console.log(`Moving page from '${preTaskPageData.title}' to '${pageData.title}'.`);
            actionTaken = true;
          }
          if (pageData.text !== preTaskPageData.text) {
            console.log(`Editing the page '${pageData.title}' to say '${pageData.text}' instead of '${preTaskPageData.text}'.`);
            actionTaken = true;
          }
          if (pageData.nullEdit) {
            console.log(`Null-editing the page '${pageData.title}'.`);
            actionTaken = true;
            pageData.nullEdit = null;
          }
          if (actionTaken) {
            console.log("All needed actions were performed.");
          } else {
            console.log("No action was needed for this task.");
          }
        }
        console.log(`Completed processing of page '${pageData.title}'.`);
      }
      console.log("All pages processed.");
    }
  }
};
</script>
