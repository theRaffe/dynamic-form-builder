import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormContainerModule } from '@form-builder/shared';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                FormContainerModule,
                BrowserAnimationsModule,
                MatButtonModule,
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'start-app'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('start-app');
    });

    // it('should render title', () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   fixture.detectChanges();
    //   const compiled = fixture.nativeElement as HTMLElement;
    //   expect(compiled.querySelector('.content span')?.textContent).toContain('start-app app is running!');
    // });
    it('Test code of reading output json', () => {
      const outjson: any = {
        infoGeneral: {
          name: '<value>',
          title: '<value>',
          age: '<value>'
        },
        details: {
          step1: {
            birthdate: '<value>'
          },
          languages: '<value>',
          experience: '<value>',
          step2: {
            innerNode: {
              languages: '<value>',
            },
            score: '<value>'
          }
        }
      }

      const valuesDict: any = {
        name: 'Raffe',
        title: 'React dev',
        age: 44,
        birthdate: '10/10/1979',
        languages: ['Python', 'Java'],
        experience: 6,
        score:9.5
      };

      const result = fillObjectOutput(outjson, valuesDict);
      console.log('********RESULT JSON***********');
      console.log(JSON.stringify(result, null, '\t'));
    });
});


function fillObjectOutput(outputConfig:any, valuesDict:any) {
  const tempResult = structuredClone(outputConfig);
  fillObjectOutputInner(tempResult, valuesDict);

  return tempResult;
}

function fillObjectOutputInner(tempResult:any, valuesDict:any) {
  const keyValueCode = '<value>';
  const allKeys = Object.getOwnPropertyNames(tempResult);
  
  for(const keyName of allKeys) {
    const hasProperties =Object.getOwnPropertyNames(tempResult[keyName]).length > 0;
    if (tempResult[keyName] === keyValueCode) {
      tempResult[keyName] = valuesDict[keyName];
    } else if (typeof tempResult[keyName] === 'object' && hasProperties) {
      fillObjectOutputInner(tempResult[keyName], valuesDict);
    }
  }
}