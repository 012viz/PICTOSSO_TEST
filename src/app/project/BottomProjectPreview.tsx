import ARModelViewer from '@/components/ARModelViewer'
import { bottomProjectPreviewOpen } from '@/signals'
import { Suspense, useRef } from 'react'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'

const BottomProjectPreview = () => {
    const sheetRef = useRef<BottomSheetRef>(null)

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.8]}
            onDismiss={() => bottomProjectPreviewOpen.value = false}
            open={bottomProjectPreviewOpen.value}
            className="h-full"
        >
            <div className="flex h-[calc(80vh-1.5rem)] w-full">
                <ARModelViewer static={true} />
            </div>

        </BottomSheet>

    )
}

export default BottomProjectPreview;