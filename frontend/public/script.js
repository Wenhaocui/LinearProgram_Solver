/**
 * Set the initial values of linear programming functions
 */
function initialize() {
  document.getElementById("objective_func").value = "3x + y";
  document.getElementById("subject_to_1").value = "2x - y <= 4";
  document.getElementById("subject_to_2").value = "2x + 3y <= 12";
  document.getElementById("subject_to_3").value = "y <= 3";

  let loader = document.getElementById("loader");
  loader.style.display = "none";

}

initialize();

/**
 * Handle the click event on Submit (Generate) button
 */
document.getElementById("submit").onclick = function() {
  submit();
};

/**
 * An async function to send the request to the backend.
 */
async function submit() {
  console.log("In submit!");

  // Set the mouse cursor to hourglass
  document.body.style.cursor = "wait";

  // Accessing the div that has random value 
  let solution_lp = document.getElementById("result_by_lp_solver");

  solution_lp.innerHTML = "Please wait...";
  
  // Show the loader element (spinning wheels)
  let loader = document.getElementById("loader");
  loader.style.display = "inline-block";

  try {
    // Get the min/max values from the user 
    //let min_value = document.getElementById("min_value").value;
    //let max_value = document.getElementById("max_value").value;
    
    let objective = document.getElementById("objective_func").value;
    let subject1 = document.getElementById("subject_to_1").value;
    let subject2 = document.getElementById("subject_to_2").value;
    let subject3 = document.getElementById("subject_to_3").value;
    let max_or_min = document.getElementById("optimize").value;
    let integer_solution = document.getElementById("integer_solution").value;

    //处理字符串 -> object
    function input_to_json(objective, subject1, subject2, subject3, max_or_min, integer_solution){
      return input_json;
    }
    // let input_json = input_to_json(objective, subject1, subject2, subject3, max_or_min, integer_solution);
    let input_json = {
      optimize: 'maximize',
      opType: 'max',
      constraints: { c1: { max: 4 }, c2: { max: 12 }, c3: { max: 3 } },
      variables: {
        x: { maximize: 3, c1: 2, c2: 2, c3: 0 },
        y: { maximize: 1, c1: -1, c2: 3, c3: 1 }
      }
    };
    input_json = JSON.stringify(input_json);
    console.log(input_json);
    let request_get = `http://127.0.0.1:5000/?model=${input_json}`;
    //let request_post = `http://127.0.0.1:5000/upload`;
    console.log("request via HTTP GET method: ", request_get);


    // Send an HTTP GET request to the backend
    const data = await axios.get(request_get);
    console.log(data);
    
    // Display the random value
    solution_lp.innerHTML = "Here is your solution: " + JSON.stringify(data.data.output_lp);
    
  } catch (error) {
    console.log("error: ", error);
  }

  // Set the cursor back to default
  document.body.style.cursor = "default";

  // Hide loader animation
  loader.style.display = "none";
}
