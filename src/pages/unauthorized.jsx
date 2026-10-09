
import { useNavigate } from "react-router-dom";
import {
    motion,
    MotionConfig,
    useReducedMotion,
} from "motion/react";
import {
    ShieldX,
    LockKeyhole,
    ArrowLeft,
    ShieldCheck,
} from "lucide-react";

const Unauthorized = () => {
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();

    const fadeUp = {
        hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 24,
        },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: shouldReduceMotion ? 0 : 0.55,
            ease: "easeOut",
        },
        },
    };

    const cardVariants = {
        hidden: {
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.94,
        y: shouldReduceMotion ? 0 : 20,
        },
        visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: shouldReduceMotion ? 0 : 0.09,
        },
        },
    };

    return (
        <MotionConfig reducedMotion="user">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-main px-4 py-10 text-text-primary transition-colors duration-300 sm:px-6">

            {/* Animated Background */}
            <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-brand-active/10 blur-3xl"
            animate={
                shouldReduceMotion
                ? {}
                : {
                    x: [0, 35, 0],
                    y: [0, 25, 0],
                    scale: [1, 1.12, 1],
                    }
            }
            transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            />

            <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-status-danger/5 blur-3xl"
            animate={
                shouldReduceMotion
                ? {}
                : {
                    x: [0, -30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                    }
            }
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            />

            {/* Main Card */}
            <motion.section
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full max-w-lg rounded-3xl border border-border-main bg-card-bg p-6 shadow-xl shadow-black/[0.04] transition-colors duration-300 sm:p-10"
            >
            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="mb-8 flex items-center gap-3"
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-active-bg text-brand-active">
                <ShieldCheck size={23} />
                </div>

                <div>
                <h2 className="text-sm font-bold tracking-tight">
                    Admin Portal
                </h2>
                <p className="mt-0.5 text-xs text-text-secondary">
                    Security Center
                </p>
                </div>
            </motion.div>

            {/* Shield Illustration */}
            <motion.div
                variants={fadeUp}
                className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center"
            >
                <motion.div
                className="absolute inset-2 rounded-full border border-border-main"
                animate={
                    shouldReduceMotion
                    ? {}
                    : { rotate: 360 }
                }
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                }}
                />

                <motion.div
                className="absolute inset-6 rounded-full border border-dashed border-border-main"
                animate={
                    shouldReduceMotion
                    ? {}
                    : { rotate: -360 }
                }
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                }}
                />

                <motion.div
                className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-status-danger/20 bg-status-danger/5 text-status-danger shadow-sm"
                animate={
                    shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -5, 0],
                        }
                }
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                >
                <ShieldX size={58} strokeWidth={1.35} />

                <motion.div
                    className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-border-main bg-card-bg text-brand-active shadow-md"
                    initial={
                    shouldReduceMotion
                        ? false
                        : { scale: 0, rotate: -25 }
                    }
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 15,
                    delay: shouldReduceMotion ? 0 : 0.5,
                    }}
                >
                    <LockKeyhole size={21} strokeWidth={1.8} />
                </motion.div>
                </motion.div>

                <motion.span
                className="absolute right-5 top-7 h-2.5 w-2.5 rounded-full bg-brand-active/70"
                animate={
                    shouldReduceMotion
                    ? {}
                    : { opacity: [0.35, 1, 0.35] }
                }
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                }}
                />

                <motion.span
                className="absolute bottom-8 left-4 h-2 w-2 rounded-full bg-status-danger/60"
                animate={
                    shouldReduceMotion
                    ? {}
                    : { opacity: [0.3, 0.9, 0.3] }
                }
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5,
                }}
                />
            </motion.div>

            {/* Error Content */}
            <motion.div
                variants={fadeUp}
                className="text-center"
            >
                <motion.p
                className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-status-danger"
                initial={
                    shouldReduceMotion
                    ? false
                    : { opacity: 0, letterSpacing: "0.05em" }
                }
                animate={{ opacity: 1, letterSpacing: "0.22em" }}
                transition={{ duration: 0.6, delay: 0.25 }}
                >
                Error 403
                </motion.p>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Access Denied
                </h1>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-text-secondary sm:text-base">
                You don't have permission to access this page.
                Please contact your administrator if you believe
                this is a mistake.
                </p>
            </motion.div>

            {/* Single Action */}
            <motion.div
                variants={fadeUp}
                className="mt-8"
            >
                <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={
                    shouldReduceMotion
                    ? {}
                    : { y: -2 }
                }
                whileTap={
                    shouldReduceMotion
                    ? {}
                    : { scale: 0.98 }
                }
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-active px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-active"
                >
                <ArrowLeft
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                Go Back
                </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.div
                variants={fadeUp}
                className="mt-8 border-t border-border-main pt-5 text-center"
            >
                <p className="text-xs leading-6 text-text-secondary">
                Protected area · Authorized access only
                </p>
            </motion.div>
            </motion.section>
        </main>
        </MotionConfig>
    );
};

export default Unauthorized;
