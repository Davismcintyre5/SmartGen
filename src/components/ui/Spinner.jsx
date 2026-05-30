import React from 'react';

const Spinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 rounded-full border-3 border-amber-400 border-t-transparent animate-spin" />
  </div>
);

export default Spinner;