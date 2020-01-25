// import { Component, Inject } from '@angular/core';
// import { TestService } from '../../test.service';
// import { Router } from '@angular/router';
// import { MessageService } from 'src/app/message.service';
// import { HttpClient } from '@angular/common/http';
// //import { ConsoleReporter } from 'jasmine';

// @Component({
//     selector: 'app-flashcard-create',
//     templateUrl: './flashcard-create.component.html',
//     styleUrls: ['./flashcard-create.component.css']
// })

// export class FlashcardCreateComponent {

//     public addingWordPanel = false;
//     public words: Array<string> = [''];
//     public wordsW: Array<string> = [''];
//     public translatedWords: Array<string> = [''];
//     public sentence: Array<string> = [''];
//     public translatedSentence: Array<string> = [''];

//     testKeywords: string;
//     testDescription: string;
//     testTitle: string;
//     testType: string = "Flashcards";
//     testLanguage: Language;
//     testLevel: Level;

//     editTest: any;

//     languages: Language[];
//     levels: Level[];
//     flashcards: Flashcard[];

//     constructor(
//         private testService: TestService,
//         private messageService: MessageService,
//         private router: Router,
//         private http: HttpClient,
//         @Inject('BASE_URL') private baseUrl: string) {
   
//         this.http.get<Language[]>(baseUrl+"api"+"/language").subscribe(result => {
//             this.languages = result;
//         }, error => console.error(error));

//         this.http.get<Level[]>(baseUrl+"api"+"/level").subscribe(result => {
//             this.levels = result;
//         }, error => console.error(error));
//     }

//     showAddingWordPanel(){
//         this.addingWordPanel = true;
//     }

//     hideAddingWordPanel()
//     {
//         this.addingWordPanel = false;
//     }

//     addNewWord()
//     {
//         this.translatedWords.push('');
//         this.words.push('');
//         this.wordsW.push('');
//         this.sentence.push('');
//         this.translatedSentence.push('');

//         let flashcard: Flashcard = { 
//             TestId: 1,
//             Word1: '',
//             Word2: '',
//             Example1: '',
//             Example2: ''
//         }
//         this.flashcards.push(flashcard);
        
//     }
//     deleteWord(index: number){
//         this.translatedWords.splice(index,1);
//         this.words.splice(index,1);
//         this.wordsW.splice(index,1);
//         this.sentence.splice(index,1);
//         this.translatedSentence.splice(index,1);
//         this.flashcards.splice(index,1);
//     }

//     addFlashcards(){

//         let isPossible: boolean = true;
//         let i: number = 0;
//         this.wordsW.forEach(element => {
//             if(element == "") isPossible = false;
//             if(this.translatedWords[i] == "") isPossible = false;
//             if(this.sentence[i] == "") isPossible = false;
//             if(this.translatedSentence[i] == "") isPossible = false;
//             i++;
//         });
//         if(isPossible){
//             console.log(this.editTest.Id)
//             this.testService.addFlashcards(this.createFlashcards(this.editTest.id)).subscribe(result => {
//                 console.log(result.toString())
//                 this.messageService.success("Created new flashcards");
//                 this.router.navigateByUrl('/tests/add', { skipLocationChange: true }).then(() => {
//                     this.router.navigate(['/tests/add']);
//                 }); 
//             }, error => console.error(error));
//         } else {
//             this.messageService.error("Invalid form");
//         }
//     }

//     addTest(){
//         this.testService.addTest(this.createTest()).subscribe(result => {
//             this.editTest = result;
//             this.addFlashcards();
//         }, error => console.error(error))
//         this.addFlashcards();
//     }

//     private createTest(){
//         let test: Test = {
//             Tags: this.testKeywords,
//             Description: this.testDescription,
//             Language: this.testLanguage.Name,
//             Type: this.testType,
//             Level: this.testLevel.Name,
//             User: null,
//         }
//         return test;
//     }

//     private createFlashcards(testId: number){
//         let flashcards: Flashcard[] = [];
//         let i: number = 0;

//         for (let entry of this.wordsW) {
//             let flashcard: Flashcard = {
//                 TestId: testId,
//                 Word1: entry,
//                 Word2: this.translatedWords[i],
//                 Example1: this.sentence[i],
//                 Example2: this.translatedSentence[i]
//             }
//             i++;
//             flashcards.push(flashcard);
//         }
//         return flashcards;
//     }
    
// }
