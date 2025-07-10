import React, { useState } from 'react';

import { Checkbox } from '@soup/design-system';
import { Button } from '~/shared/ui';

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
        intent="squared"
        status="point"
        size="lg"
        type="submit"
        disabled={!checked}
        className="w-full"
      >
        회원가입 하기
      </Button>
    </div>
  );
}
