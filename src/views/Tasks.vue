<template>
  <div id="taskwindow" class="flex h-full">

    <div id="pagelist" class="flex flex-col w-1/3 mx-1 flex-grow-0 bg-gray-100">
      <h2 class="mx-auto my-1 text-2xl">Pages</h2>
      <textarea class="border border-gray-400 h-full mx-1 resize-none text-sm font-mono my-auto" :value="taskPages.join('\n')" @input="onPageListAreaInput"></textarea>
      <div class="flex">
        <button class="mt-1 mx-auto flex-shrink-0 hover:bg-gray-300 flex" title="Generate page list" @click="generatorModalOpen = true">
          <svg-icon width="32" height="32" icon="plus" />
        </button>
      </div>
    </div>

    <div id="tasklist" class="flex flex-col w-2/3 mx-1 bg-gray-100">
      <h2 class="mx-auto my-1 text-2xl">Current Tasks</h2>
      <div class="overflow-y-auto my-1">
        <div v-for="task in tasks" :key="task.internalId">
          <div v-if="expandedTasks[task.internalId]" class="flex flex-col bg-gray-200 mx-1 my-0.5 px-1 py-1">
            <div class="flex justify-between">
              <button class="flex-shrink-0 opacity-60"><svg-icon width="24" height="24" icon="drag-indicator" /></button>
              <h3 class="text-lg mx-auto">Task {{task.internalId}}: {{task.name}}</h3>
              <button class="flex-shrink-0 hover:bg-gray-300" title="Collapse" @click="collapseTask(task.internalId)"><svg-icon width="24" height="24" icon="chevron-double-up" /></button>
            </div>
            <p class="mt-1 mb-3">{{task.description}}</p>
            <div class="flex justify-between">
              <button class="flex-shrink-0 hover:bg-gray-300" title="Task options"><svg-icon width="24" height="24" icon="cog" /></button>
              <div class="select-none hover:bg-gray-300 px-1">
                <label :for="'task-' + task.internalId + '-enabled'">Enabled? </label>
                <input :id="'task-' + task.internalId + '-enabled'" type="checkbox" v-model="task.enabled">
              </div>
            </div>
          </div>
          <div v-else class="flex justify-between bg-gray-200 mx-1 my-0.5 px-1 py-1">
            <button class="flex-shrink-0 opacity-60"><svg-icon width="24" height="24" icon="drag-indicator" /></button>
            <h3 class="text-lg">Task {{task.internalId}}: {{task.name}}</h3>
            <button class="flex-shrink-0 hover:bg-gray-300" title="Expand" @click="expandTask(task.internalId)"><svg-icon width="24" height="24" icon="chevron-double-down" /></button>
          </div>
        </div>
      </div>
      <div class="flex mt-auto">
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300" title="Options"><svg-icon width="32" height="32" icon="cog" /></button>
        <button class="mr-auto flex-shrink-0 hover:bg-gray-300" title="Add task"><svg-icon width="32" height="32" icon="document-add" /></button>
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300" title="Run or resume tasks"><svg-icon width="32" height="32" icon="play" /></button>
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300" title="Pause all tasks to resume later"><svg-icon width="32" height="32" icon="pause" /></button>
        <button class="mx-0.5 flex-shrink-0 hover:bg-gray-300" title="Abort all tasks (loses all progress)"><svg-icon width="32" height="32" icon="stop" /></button>
      </div>
    </div>

  </div>
  <teleport to="body">
    <div v-if="generatorModalOpen" class="fixed inset-0 w-screen h-screen z-10 backdrop-filter backdrop-brightness-50">
      <div class="fixed inset-0 w-4/5 h-4/5 m-auto bg-white border-2 border-gray-700 grid grid-rows-6 grid-cols-3 gap-1">
        <div class="row-start-1 row-end-6 col-start-1 col-end-3 bg-gray-100 flex flex-col">
          <div class="bg-indigo-100 text-center">
            <h3 class="text-xl">Page Generators</h3>
          </div>
          <div class="overflow-y-auto mt-1">
            <div v-for="generator in generatorList" :key="generator.id" class="px-1" @click="generatorModalChosenGenerator = generator.id" :class="{'bg-gray-300': generatorModalChosenGenerator === generator.id, 'hover:bg-gray-200': generatorModalChosenGenerator !== generator.id}">
              <input type="radio" name="page-generator" :id="'page-generator-selector-' + generator.id" v-model="generatorModalChosenGenerator" :value="generator.id" class="absolute opacity-0 w-0 h-0" />
              <label :for="'page-generator-selector-' + generator.id" class="select-none">{{generator.name}}</label>
            </div>
          </div>
        </div>
        <div class="row-start-1 row-end-6 col-start-3 bg-gray-100 flex flex-col">
          <div class="bg-indigo-100 text-center">
            <h3 class="text-xl">Generator Options</h3>
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
                  class="px-0.5"
                >
              </div>
              <div v-else class="flex flex-col">
                <label :for="getGeneratorOptionInputId(genOption.id)" class="mr-auto select-none"> {{genOption.name}}</label>
                <input :id="getGeneratorOptionInputId(genOption.id)" type="text" v-model="generatorOptionValues[genOption.id]" class="px-0.5">
              </div>
            </div>
          </div>
        </div>
        <div class="row-start-6 col-start-1 col-end-4 bg-gray-100 flex justify-around items-center">
          <button @click="generatePages()" class="select-none bg-gray-300 px-1.5 py-0.5 hover:shadow">Generate</button>
          <button @click="generatorModalOpen = false" class="select-none bg-gray-300 px-1.5 py-0.5 hover:shadow">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
import * as pageGenerators from "@/libraries/pageGenerators.js";

export default {
  components: { SvgIcon },
  data() {
    return {
      generatorModalOpen: false,
      generatorModalChosenGenerator: "numbers",
      generatorModalGeneratorOptions: {},
      expandedTasks: {},
      tasks: [
        {
          internalId: 1,
          name: "Null edit",
          description: "Make a blank edit to the page to purge server-side cache.",
          enabled: false
        },
        {
          internalId: 2,
          name: "Category change for patch notes",
          description: "Renaming category 'PatchNotes' to 'Patch notes' to make the name less artificial.",
          enabled: false
        },
        {
          internalId: 3,
          name: "Remove deprecated parameter",
          description: "Remove the copy-paste legacy 'isCat' parameter from transclusions of Template:InfoboxCat. All cats are trivially cats.",
          enabled: false
        },
      ],
      taskPages: [

      ]
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
    }
  },
  methods: {
    getGeneratorOptionInputId(optionId) {
      return `generator-option-${this.generatorModalChosenGenerator}-${optionId}`;
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
    }
  }
};
</script>
