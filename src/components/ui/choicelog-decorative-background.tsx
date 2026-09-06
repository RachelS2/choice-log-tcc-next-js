export default function DecorativeBackground() {
    return (
        <div
            className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full
                bg-blue-100/40 blur-3xl transition-opacity duration-300
                group-hover:bg-blue-200/50"
        />
    )
}