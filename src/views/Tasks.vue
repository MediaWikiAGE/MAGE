<template>
  <div id="taskwindow" class="flex h-full">
    <div id="pagelist" class="flex flex-col w-1/3 mx-1 flex-grow-0 bg-gray-100">
      <h2 class="mx-auto my-1 text-2xl">Pages</h2>
      <textarea class="border border-gray-400 h-full mx-1 resize-none text-sm font-mono my-auto"></textarea>
      <div class="flex">
        <button class="mt-1 mx-auto flex-shrink-0 hover:bg-gray-300 flex" title="Generate page list">
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
</template>

<script>
import SvgIcon from "@/components/SvgIcon";

export default {
  components: { SvgIcon },
  data() {
    return {
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
  methods: {
    expandTask(internalId) {
      this.expandedTasks[internalId] = true;
    },
    collapseTask(internalId) {
      this.expandedTasks[internalId] = false;
    }
  }
};
</script>
