import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Render the dialog root element used as the container for a dialog.
 *
 * Renders a Radix Dialog root element with a `data-slot="dialog"` attribute.
 * @param {object} props - Props to apply to the dialog root; accepts any valid Dialog.Root props and children.
 * @returns {JSX.Element} The rendered dialog root element.
 */
function Dialog({
  ...props
}) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * Renders a trigger element used to open or toggle the dialog.
 *
 * @param {object} props - Props applied to the trigger element; all props are forwarded to the rendered element.
 * @returns {JSX.Element} The dialog trigger element.
 */
function DialogTrigger({
  ...props
}) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * Render a Radix Portal configured for dialog content.
 *
 * @param {object} props - Props forwarded to the underlying Radix Portal (e.g., children, className, container).
 * @returns {JSX.Element} The portal element with data-slot="dialog-portal" that mounts dialog children into a React portal.
 */
function DialogPortal({
  ...props
}) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * Renders a dialog close control that triggers dialog dismissal.
 *
 * @param {Object} props - Props passed through to the underlying close element (e.g., event handlers, className, aria-label).
 * @returns {JSX.Element} The dialog close element.
 */
function DialogClose({
  ...props
}) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * Renders the dialog overlay (a fullscreen, animated semi-transparent backdrop).
 *
 * @param {Object} props - Props passed to the overlay.
 * @param {string} [props.className] - Additional CSS classes merged with the overlay's default classes.
 * @returns {JSX.Element} A fullscreen, animated, semi-transparent backdrop element for the dialog.
 */
function DialogOverlay({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props} />
  );
}

/**
 * Render the dialog's content inside a portal with an overlay and an optional close control.
 *
 * The component centers and styles the dialog content, merges any provided `className`, renders
 * children inside the content region, and conditionally shows a Close button when `showCloseButton` is true.
 *
 * @param {string} [className] - Additional CSS classes to apply to the content container.
 * @param {import('react').ReactNode} [children] - Elements to render inside the dialog content.
 * @param {boolean} [showCloseButton=true] - Whether to render the built-in close button in the top-right corner.
 * @returns {JSX.Element} The composed dialog content element (including portal and overlay).
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * Render a header container for dialog content with default spacing and responsive alignment.
 *
 * Renders a div with `data-slot="dialog-header"` that stacks children vertically, applies
 * gap spacing, centers text on small screens and left-aligns on larger screens. Any provided
 * `className` is combined with the default classes and other props are forwarded to the element.
 * @returns {JSX.Element} The dialog header element.
 */
function DialogHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props} />
  );
}

/**
 * Render a styled footer container for dialog actions.
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to merge with the default footer layout.
 * @returns {JSX.Element} A div element that arranges footer content (stacked on small screens, right-aligned on larger screens).
 */
function DialogFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props} />
  );
}

/**
 * Renders a styled dialog title element.
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes to merge with the component's default typography classes.
 * @param {...any} [props] - Additional props forwarded to the underlying Radix Dialog Title element.
 * @returns {JSX.Element} The rendered dialog title element.
 */
function DialogTitle({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props} />
  );
}

/**
 * Renders a styled dialog description element for use inside DialogContent.
 *
 * @param {object} props - Props passed to the underlying description element.
 * @param {string} [props.className] - Additional CSS class names to apply.
 * @returns {JSX.Element} The rendered dialog description element.
 */
function DialogDescription({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}