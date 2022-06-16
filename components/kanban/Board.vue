<template>
  <div class="whitespace-nowrap overflow-auto">
    <kanban-board-col title="To do" :issue-type="6"></kanban-board-col>
    <kanban-board-col title="Doing" :issue-type="2"></kanban-board-col>
    <kanban-board-col title="Review" :issue-type="4"></kanban-board-col>
    <kanban-board-col title="Done" :issue-type="5"></kanban-board-col>
  </div>
</template>