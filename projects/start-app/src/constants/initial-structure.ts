import { InputStructure } from '@form-builder/models';

export const initialStructure: InputStructure[] = [
    {
        name: 'nickname',
        title: 'Nickname',
        type: 'text',
        validations: {
            required: true,
        },
    },
    {
        name: 'score',
        type: 'number',
        title: 'Puntaje en Ejercicio Técnico',
        validations: {
            range: {
                min: 1,
                max: 10,
            },
        },
    },
    {
        name: 'department',
        type: 'select',
        title: 'Área de Interés',
        options: ['Desarrollo Frontend', 'Desarrollo Backend', 'Otro'],
        validations: {
            required: true,
        },
    },
];
