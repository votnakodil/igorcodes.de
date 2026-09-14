export function ArrowIcon({ down = false }: { down?: boolean }) {
    return <svg className={down ? "link-arrow link-arrow-down" : "link-arrow"} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d={down ? "M12 4v16m-6-6 6 6 6-6" : "M6 18 18 6M6 6h12v12"} />
    </svg>;
}
