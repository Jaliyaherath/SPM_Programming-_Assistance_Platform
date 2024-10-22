'use client';
import React, { useContext } from 'react';
import { Select, Space, Switch } from 'antd';
import ICodeEditorContext from '@/interfaces/ICodeContext';
import { CodeEditorContext } from '@/context/CodeEditorContext';
import SunIcon from './customIcons/SunIcon';
import MoonIcon from './customIcons/MoonIcon';


const ThemeDropDown: React.FC = () => {
    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { setThemeHandler } = codeEditorCtx!;

    const handleChange = (isLight: boolean) => {
        setThemeHandler(isLight);
    }
    return (
        <Space>
            <Switch
                checkedChildren={<SunIcon width={20} />}
                unCheckedChildren={<MoonIcon />}
                onChange={handleChange}
            />
        </Space>
    )
};

export default ThemeDropDown;