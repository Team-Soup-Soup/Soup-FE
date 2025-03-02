import React from 'react';
import { useParams } from 'react-router-dom';
import mock from '~/mocks/descriprions.json';

export default function ProjectHeader() {
  const { projectId } = useParams();
  const mockKey = projectId as keyof typeof mock;
  return (
    <div className="mb-10">
      <p className="text-lg font-semibold">{projectId}</p>
      <p className="text-light text-lg font-light">
        {mock[mockKey].description}
      </p>
      <div className="flex items-center">
        <div className="bg-lock mr-3 h-[6px] w-[540px] rounded-sm"></div>0%
      </div>
    </div>
  );
}
