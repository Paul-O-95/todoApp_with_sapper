<script>
  import axios from "axios";
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import ModalEdit from "./ModalEdit.svelte";

  const dispatch = createEventDispatcher();

  let todos = "";
  let todosList = [];
  let editButtonClick = false;

  (async () => {
    const res = await axios.get("http://localhost:2020");
    // console.log(res.data.data.results);

    if (res.data.status === "success") todosList = res.data.data.results;
    todosList.sort((a, b) => -1);
  })();

  // CreateTodo Function
  function todosCreated(res) {
    return res.data.status === "success";
  }
  async function onSubmit(event) {
    event.preventDefault();
    let res = await axios.post("http://localhost:2020/addTodo", {
      todo: todos
    });
    console.log(res.status);
    if (todosCreated(res)) {
      let todo = res.data.data.todoList;
      todosList = [todo, ...todosList];
      todos = "";
    }
  }

  // editTodo Fucntion
  function id(id) {
    // let ids= req.params.id
    return id;
  }
  async function editTodo(id) {
    editButtonClick = true;
    let res = await axios.put(`http://localhost:2020/editTodo/${id}`, {
      _id: id,
      todo: todos
    });
    console.log(res);
    console.log(id);
  }

  // Delete Function
  function removeTodo(res) {
    return res.data.status === "success";
  }
  async function deleteTodo(id) {
    const deleteTodo = await axios.delete(
      `http://localhost:2020/deleteTodo/${id}`
    );
    console.log(deleteTodo.status);
    if (removeTodo(deleteTodo)) {
      todosList = todosList.filter(t => t._id != id);
    }
  }
</script>

<style>

</style>

<form id="todoForm" on:submit={onSubmit}>
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
        <p
          class=" mt-4 bg-dark col-md text-light pl-3"
          transition:fly={{ y: 200, duration: 2000 }}
          on:introstart={() => 'intro started'}>
          {i + 1}: {todoList.todo}
        </p>
        <button
          class="btn btn-primary btn-sm todo-btn flex-sm-row-reverse"
          data-toggle="modal"
          data-target="#basicExampleModal"
          on:click={() => editTodo(todoList._id)}>
          <i class="fas fa-pen-fancy" />
        </button>
        <button
          class="btn btn-danger btn-sm todo-btn flex-sm-row-reverse"
          on:click={() => deleteTodo(todoList._id)}>
          <i class="fas fa-trash-alt" />
        </button>
      </div>

      {#if editButtonClick === true}
        <!-- Modal -->
        <ModalEdit todo={todoList.todo} />
      {/if}
    {/each}
  {/if}
</div>
