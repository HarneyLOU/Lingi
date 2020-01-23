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

  constructor(
      private testService: TestService,
      private messageService: MessageService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      @Inject('BASE_URL') private baseUrl: string) {
      //let type = this.router.getCurrentNavigation().extras.state.type;
      var id = +this.activatedRoute.snapshot.params["id"];

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
        let flashcard: Flashcard = { 
            TestId: 1,
            Word1: '',
            Word2: '',
            Example1: '',
            Example2: ''
        }
        this.flashcards.push(flashcard);
    }
    deleteWord(index: number){
        this.words.splice(index,1);
        this.flashcards.splice(index,1);
    }

    addFlashcards(){
        // let isPossible: boolean = true;
        // this.flashcards.forEach(element => {
        //     if(element.Word1 == "") isPossible = false;
        //     if(element.Word2 == "") isPossible = false;
        //     if(element.Example1 == "") isPossible = false;
        //     if(element.Example2 == "") isPossible = false;
        // });

        // if(isPossible){
        //     console.log(this.editTest.Id)
        //     this.testService.addFlashcards(this.createFlashcards(this.editTest.id)).subscribe(result => {
        //         console.log(result.toString())
        //         this.messageService.success("Created new flashcards");
        //         this.router.navigateByUrl('/tests/add', { skipLocationChange: true }).then(() => {
        //             this.router.navigate(['/tests/add']);
        //         }); 
        //     }, error => console.error(error));
        // } else {
        //     this.messageService.error("Invalid form");
        // }
    }

    updateTest(){
        this.testService.updateTest(this.createTest()).subscribe(result => {
            this.editTest = result;
           // this.addFlashcards();
        }, error => console.error(error))
        this.addFlashcards();
    }

    private createTest(){
        let test: Test = {
            Tags: this.testKeywords,
            Description: this.testDescription,
            Language: this.testLanguage.Name,
            Type: this.testType,
            Level: this.testLevel.Name,
            User: null,
        }
        return test;
    }

    private createFlashcards(testId: number){
        // let flashcards: Flashcard[] = [];
        // let i: number = 0;

        // for (let entry of this.flashcards) {
        //     let flashcard: Flashcard = {
        //         TestId: testId,
        //         Word1: entry.Word1,
        //         Word2: entry.Word2,
        //         Example1: entry.Example1,
        //         Example2: entry.Example2
        //     }
        //     i++;
        //     flashcards.push(flashcard);
        // }
        // return flashcards;
    }


}
