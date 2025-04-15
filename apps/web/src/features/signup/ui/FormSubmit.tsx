import React, { useState } from 'react';

import { Button, Checkbox } from '@soup/design-system';

export default function FormSubmit() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 w-full p-16">
      <Checkbox
        id="signup-agreement"
        className="mb-4"
        onChange={() => setChecked((prev) => !prev)}
        label={
          <>
            <span className="text-point">개인정보 처리방침</span>에 따른
            개인정보 수집 및 활용에 동의합니다. (필수)
          </>
        }
      />
      <Button
        color="normal"
        size="lg"
        type="submit"
        disabled={!checked}
        className="bg-point hover:bg-point-dark auth-button disabled:bg-main-board-border rounded-[10px] font-semibold text-white disabled:pointer-events-none"
      >
        회원가입 하기
      </Button>
    </div>
  );
}
