import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { byDataQa } from 'src/test-utils/test-helpers';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let nativeElement;
  let mockNavigationService;

  beforeEach(async () => {
    mockNavigationService = {
      goto: vi.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      providers: [
        {provide: NavigationService, useValue: mockNavigationService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    component.item = {
      title: "Starting a Robot Journey",
      description:
        "I run through how I've started making my own robot with a Raspberry Pi.",
      image: "/image-server/robot-mk1.jpg",
      url: 'blogs'
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).to.exist;
  });

  describe("displaying item", () => {
    describe("image", () => {
      it("should display the image", () => {
        expect(
          getElementByDataQa("image").getAttribute("src")
        ).to.equal('/image-server/robot-mk1.jpg');
      });
    });

    describe('title', () => {
      it("should contain the title", () => {
        expect(
          getElementByDataQa("title").textContent
        ).to.contain(component.item.title);
      });
    });

    describe("description", () => {
      it("should contain the description", () => {
        expect(
          getElementByDataQa("description").textContent
        ).to.contain(component.item.description);
      });
    });
  });

  describe("on click", () => {
    it('should navigate to the item\'s page', () => {
      getElementByDataQa("list-item-container").click();

      expect(mockNavigationService.goto).toHaveBeenCalledWith("blogs");
    });
  });


  const getElementByDataQa = (dataQa: string) => {
    return nativeElement.querySelector(byDataQa(dataQa)) as any;
  }
});
