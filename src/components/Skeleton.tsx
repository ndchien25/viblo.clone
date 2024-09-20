import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';

const Skeleton = () => {
  return (
    <div className="max-w-7xl items-center justify-center m-auto px-7">
      <div className="grid grid-cols-16 pt-4 pb-4 gap-4">
        <div className="col-start-1 col-span-1">
          <ShadcnSkeleton className="h-full w-5" />
        </div>
        <div className="col-start-2 col-end-17">
          <header>
            <div className="w-full flex flex-row">
              <div className="flex gap-2 break-words">
                <div className="flex relative flex-col">
                  <ShadcnSkeleton className="h-12 w-12 rounded-full" />
                </div>
                <div className="mr-1 leading-6">
                  <div className="flex gap-3 mb-2">
                    <div className="flex">
                      <ShadcnSkeleton className="h-6 w-64" />
                      <ShadcnSkeleton className="h-6 w-20 ml-2" />
                    </div>
                  </div>
                  <div className="flex gap-[10px]">
                    <ShadcnSkeleton className="h-5 w-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-wrap items-end flex-1">
                <ShadcnSkeleton className="h-4 w-48" />
                <div className="flex items-center">
                  <ShadcnSkeleton className="h-4 w-32 mr-2" />
                  <ShadcnSkeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
            <ShadcnSkeleton className="h-8 w-full mt-4" />
          </header>
          <div className="flex justify-between mt-4">
            <ShadcnSkeleton className="h-8 w-48" />
            <ShadcnSkeleton className="h-8 w-12" />
          </div>
          <ShadcnSkeleton className="min-h-screen w-full mt-4" />
          <ShadcnSkeleton className="h-6 w-48 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
