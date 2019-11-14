
    document.getElementById("name").onchange = function (e) { 
        $('#nameOfQuiz').val($(this).val());
    };

    document.getElementById("quizDesc").onchange = function (e) { 
        $('#quizDescription').val($(this).val());
    };

        document.getElementById("number").onchange = function (e) {
        // e.preventDefault();
        container.style.display = 'block';
        const output = [];
        var i;
        var num = $(this).val();
        $('#numberOfQuestions').val(num);
        for(i=1;i<=num.toString();i++){
            output.push(` <div class="col-sm-12 card" id="ques">
            <div class="form-row">
            <div class="col-sm-6">
                <textarea required class="form-control"  name="question" id="exampleFormControlTextarea1" rows="3" placeholder="Question"></textarea>
            </div>
            <div class="col-sm-6">
                <div class="form-row">
                    <div class="col">
                        <input type="text" class="form-control" name="option1" required placeholder="Option 1">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control"  name="option2" required placeholder="Option 2">
                    </div>
                </div>
                <div style="padding-top:4%" class="form-row">
                    <div class="col">
                        <input type="text" class="form-control"  name="option3" required placeholder="Option 3">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control"  name="option4" required placeholder="Option 4">
                    </div>
                </div>
            </div>
            </div>
            <div class="form-inline">
            <div class="form-group">
            <select required id="inputState" name="correctoption" class="form-control">
            <option value="">Correct Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
      </select>
        </div>
        <div style="display:flex;flex:1">
        <span style="width:100%; text-align: right;"><h4>${i}</h4></span>
        </div>
        </div>
        </div>
        <br />`);
        }
        output.push(`<center><button type="submit" class="btn btn-primary">Submit</button></center>`);
        container.innerHTML = output.join("");
    };
    const container = document.getElementById("container");
    const question = document.getElementById("question");
    const number = document.getElementById("Number");
    document.getElementById("container").style.display = "none";

    