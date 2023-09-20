import { ComponentTypeEnum } from "@form-builder/models";
import { ConfigComponentService } from "./config-components";
import { TestBed } from "@angular/core/testing";
import { InputTextComponent } from "../../../shared/src/components/input-text/input-text.component";


describe('Testing getComponentTypes', () => {
    let service: ConfigComponentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfigComponentService],
        });
        service = TestBed.inject(ConfigComponentService);
    });

    it('getComponentTypes func should return inputText component', async () => {
        const result = await service.getComponentTypes(['text']);
        console.log('*****result:', result[ComponentTypeEnum.InputText]);
        expect(result[ComponentTypeEnum.InputText]).toBeTruthy();
        expect(result[ComponentTypeEnum.InputText]).toEqual(InputTextComponent);
        const countItem = Object.values(result).length;
        expect(countItem).toEqual(1);
    });
});