import {type ReactElement, useState} from 'react';
import {Autocomplete} from '@ozen-ui/kit/AutocompleteNext';
import {Tag} from '@ozen-ui/kit/TagNext';
import * as React from "react";

type SkillAutocompleteProps = {
    skills: string[];
    setSkills: React.Dispatch<React.SetStateAction<string[]>>
    label?: string;
    limitTags?: number;
};

export function SkillAutocomplete({
                                      skills,
                                      setSkills,
                                      label = 'Навыки',
                                      limitTags = 3
                                  }: SkillAutocompleteProps): ReactElement {
    const [inputValue, setInputValue] = useState('');

    return (
        <Autocomplete
            limitTags={limitTags}
            size="s"
            label={label}
            multiple
            allowCustomValue
            value={skills}
            inputValue={inputValue}
            options={skills}
            noOptionsText="Укажите навыки через запятую"
            disableClearButton
            disableShowChevron
            searchFunction={(opts) => opts}
            renderTag={(props) => {
                const {key: tagKey , ...rest} = props;
                return (
                    <Tag
                        {...rest}
                        key={tagKey}
                        size="s"
                    />
                );
            }}
            onChange={(_, newValue) => {
                if (newValue) {
                    const filtered = Array.from(new Set(newValue.filter(Boolean)));
                    setSkills(filtered);
                }
            }}
            inputProps={{
                onBlur: () => {
                    const newSkill = inputValue.trim();
                    if (newSkill && !skills.includes(newSkill)) {
                        setSkills((prev) => [...prev, newSkill]);
                    }
                    setInputValue('');
                },
            }}

            onInputChange={(_, value) => {
                if (value.endsWith(',')) {
                    const newSkill = value.slice(0, -1).trim();
                    if (newSkill && !skills.includes(newSkill)) {
                        setSkills((prev: string[]) => [...prev, newSkill]);

                    }
                    setInputValue("");
                } else {
                    setInputValue(value);
                }
            }}
            fullWidth
        />
    );
}
