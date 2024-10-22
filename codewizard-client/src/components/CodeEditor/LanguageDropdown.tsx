'use client';
import React, { useContext } from 'react';
import { Select, Space } from 'antd';
import ICodeEditorContext from '@/interfaces/ICodeContext';
import { CodeEditorContext } from '@/context/CodeEditorContext';
import supportedLanguages from '@/constants/supportedLanguages';

const items = supportedLanguages.map((language) => {
  return { value: language.id, label: language.name };
});

const LanguageDropdown: React.FC = () => {
  const codeEditorCtx = useContext<ICodeEditorContext | null>(
    CodeEditorContext
  );
  const { setLanguageHandler, languageName } = codeEditorCtx!;

  const handleChange = (value: string) => {
    if (!Number.isNaN(value)) {
      setLanguageHandler(+value);
      console.log(value);
    }
  };
  return (
    <Space wrap>
      <Select
        size="large"
        defaultValue={items.filter((item) => item.value === 63)[0].label}
        style={{ width: 120 }}
        onChange={handleChange}
        options={items}
        value={languageName}
      />
    </Space>
  );
};

export default LanguageDropdown;
