import { Component, OnInit, Inject } from '@angular/core';
import { TestService } from '../../test.service';
import { MessageService } from 'src/app/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flashcard-edit',
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.css']
})
export class FlashcardEditComponent{

  public addingWordPanel = false;

  editTest: any;
  languages: Language[];
  levels: Level[];
  flashcards: Flashcard[];
  public words: Array<string> = [''];

  testKeywords: string;
  testDescription: string;
  testType: string = "Flashcards";
  testLanguage: Language;
  testLevel: Level;
  testId: number = 0;

  constructor(
      private testService: TestService,
      private messageService: MessageService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      @Inject('BASE_URL') private baseUrl: string) {
      //let type = this.router.getCurrentNavigation().extras.state.type;
      var id = +this.activatedRoute.snapshot.params["id"];

      this.testId = id;

      this.http.get<any>(baseUrl+"api"+"/test/"+id).subscribe(result => {
        this.testDescription = result.Description;
        this.testType = result.Type;
        this.testLanguage = result.Language;
        this.testLevel = result.Level;
        this.testKeywords = result.Tags;
        console.log(result);
      }, error => console.error(error));

      this.http.get<Flashcard[]>(baseUrl+"api"+"/flashcard/"+id).subscribe(result => {
        this.flashcards = result;
        console.log(result);
        for(let h = 0; h<result.length-1; h++){
            this.words.push('')
        }
      }, error => console.error(error));

      this.http.get<Language[]>(baseUrl+"api"+"/language").subscribe(result => {
          this.languages = result;
      }, error => console.error(error));

      this.http.get<Level[]>(baseUrl+"api"+"/level").subscribe(result => {
          this.levels = result;
      }, error => console.error(error));
    }

    showAddingWordPanel(){
      this.addingWordPanel = true;
    }

    hideAddingWordPanel()
    {
        this.addingWordPanel = false;
    }

    addNewWord()
    {
        this.words.push('');
        let flashcardx: Flashcard = { 
            TestId: this.testId,
            Word1: '',
            Word2: '',
            Example1: '',
            Example2: ''
        }
        this.flashcards.push(flashcardx);
        console.log(flashcardx);
    }
    deleteWord(index: number){
        this.words.splice(index,1);
        this.testService.deleteFlashcards(this.flashcards[index].Id).subscribe(result => {
          console.log(result);
          this.messageService.error("Delete word");
          //this.flashcards.splice(index,1);
      }, error => console.error(error))
      this.flashcards.splice(index,1);
    }

    updateFlashcards(){
        let isPossible: boolean = true;
        this.flashcards.forEach(element => {
            console.log(element);
            if(element.Word1 == "") isPossible = false;
            if(element.Word2 == "") isPossible = false;
            if(element.Example1 == "") isPossible = false;
            if(element.Example2 == "") isPossible = false;
        });

        if(isPossible){
            this.testService.editFlashcards(this.flashcards).subscribe(result => {
                console.log(result.toString())
                this.messageService.success("Updated flashcards");
                this.router.navigateByUrl('/tests/edit', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/tests/edit']);
                }); 
            }, error => console.error(error));
        } else {
            this.messageService.error("Invalid form");
        }
    }

    updateTest(){
        this.testService.editTest(this.createTest()).subscribe(result => {
            this.editTest = result;
            console.log(result);
            this.updateFlashcards();
        }, error => console.error(error))
    }

    private createTest(){
        let test: Test = {
            Id: this.testId,
            Tags: this.testKeywords,
            Description: this.testDescription,
            Language: this.testLanguage.Name,
            Type: this.testType,
            Level: this.testLevel.Name,
            User: null,
        }
        return test;
    }

    // private createFlashcards(testId: number){
    //     let flashcards: Flashcard[] = [];
    //     let i: number = 0;

    //     for (let entry of this.flashcards) {
    //         let flashcard: Flashcard = {
    //             Id: entry.Id,
    //             TestId: testId,
    //             Word1: entry.Word1,
    //             Word2: entry.Word2,
    //             Example1: entry.Example1,
    //             Example2: entry.Example2
    //         }
    //         i++;
    //         flashcards.push(flashcard);
    //     }
    //     return flashcards;
    // }


}
