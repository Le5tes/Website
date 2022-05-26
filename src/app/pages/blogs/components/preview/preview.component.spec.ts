import { ComponentFixture, TestBed } from "@angular/core/testing";
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { NavigationService } from "src/app/services/navigation/navigation.service";
import { byDataQa } from "src/test-utils/test-helpers";

import { PreviewComponent } from "./preview.component";

describe("PreviewComponent", () => {
  let expect;
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;
  let nativeElement;

  before(() => {
    chai.use(sinonChai);
    expect = chai.expect;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewComponent],
      providers: [
        {provide: NavigationService, useValue: sinon.createStubInstance(NavigationService)}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    component.blog = {
      id: "testid123",
      createdAt: "2021-06-04T15:32:31.000Z",
      username: "Tim",
      title: "Starting a Robot Journey",
      description:
        "I run through how I've started making my own robot with a Raspberry Pi.",
      image: "/image-server/robot-mk1.jpg",
      body:
        "# Starting a robot journey\n\nI have been wanting to build my own robot for a long time. \n\nOf course I have, I'm an engineer!\n\nIt'll be awesome! Maybe it'll have legs and be able to run around and climb on things and avoid obstacles and squeeze through small gaps and..",
      tags: "robot, robotics, raspberry pi, make, robot journey, electronics",
      journey: "robot",
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).to.exist;
  });

  describe("displaying blog post", () => {
    describe("image", () => {
      it("should display the image", () => {
        expect(
          getElementByDataQa("image").getAttribute("src")
        ).to.equal(component.blog.image);
      });
    });

    describe('Title', () => {
      it("should contain the title", () => {
        expect(
          getElementByDataQa("title").textContent
        ).to.contain(component.blog.title);
      });
    });

    describe("description", () => {
      it("should contain the description", () => {
        expect(
          getElementByDataQa("description").textContent
        ).to.contain(component.blog.description);
      });
    });
  });

  describe("on click", () => {
    it('should navigate to the blog\'s page', () => {
      getElementByDataQa("preview-container").click();

      expect(component.navigationService.goto).to.have.been.calledWith("blogs/testid123")
    });
  });


  const getElementByDataQa = (dataQa: string) => {
    return nativeElement.querySelector(byDataQa(dataQa)) as any;
  }
});
