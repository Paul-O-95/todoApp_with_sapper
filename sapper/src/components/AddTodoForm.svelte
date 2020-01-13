<script>
  import axios from "axios";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let todos = "";
  let todosList = [];

  (async () => {
    const res = await axios.get("http://localhost:2020");
    // console.log(res.data.data.results);

    if (res.data.status === "success") todosList = res.data.data.results;
    todosList.sort((a, b) => -1);
  })();
  function addPostTodo({ detail: todo }) {
    todosList = [todo, ...todosList];
    console.log(todo);
  }
  async function onSubmit(event) {
    event.preventDefault();
    let todos = event.target.value;

    // if (todos.trim() === "") return;
    // dispatch("todosCreadted", { text: todos });
    todosList = [todos, ...todosList];
    // console.log(todos);
  }
  function editTodo(toDo) {
    console.log(toDo);
  }
  async function deleteTodo(id) {
    const deleteTodo = await axios.delete(
      `http://localhost:2020/deleteTodo/${id}`
    );
    if (deleteTodo.data.status === "success") {
      // location.reload();

      console.log(deleteTodo);

      todosList = todosList.filter(t => t._id != id);
      console.log(todosList);
    }
  }
</script>

<style>

</style>

<!-- <form action="http://localhost:2020/addTodo" method="POST">
  <input type="text" class="form-control" name="todo" />
  <button type="submit" class="btn btn-default">click to get todoList</button>
</form> -->

<form
  action="http://localhost:2020/addTodo"
  method="POST"
  id="todoForm"
  on:submit={onSubmit}
  on:todosCreated={addPostTodo}>
  <!-- Medium input -->
  <div class="md-form">
    <input
      type="text"
      id="inputTodo"
      class="form-control"
      name="todo"
      bind:value={todos} />
    <label for="inputMDEx">Add Todo_List here</label>
  </div>
  <button type="submit" class="btn btn-dark">Add_List</button>
</form>
<div id="todoResult" class="container col-md">
  <h2 class="mt-4 text-center">My List</h2>
  {#if todosList.length === 0}
    <p>Todo_List will be post here</p>
  {:else}
    {#each todosList as todoList, i}
      <div class="d-flex mt-2">
        <p class=" mt-4 bg-dark col-md text-light pl-3">
          {i + 1}: {todoList.todo}
        </p>
        <button
          class="btn btn-primary btn-sm todo-btn flex-sm-row-reverse"
          on:click={() => editTodo(todoList)}>
          <i class="fas fa-pen-fancy" />
        </button>
        <button
          class="btn btn-danger btn-sm todo-btn flex-sm-row-reverse"
          on:click={() => deleteTodo(todoList._id)}>
          <i class="fas fa-trash-alt" />
        </button>
      </div>
    {/each}
  {/if}

</div>
